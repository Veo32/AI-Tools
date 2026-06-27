import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BillingProvider } from "@prisma/client";
import Stripe from "stripe";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateCheckoutDto } from "./dto/create-checkout.dto";

@Injectable()
export class BillingService {
  private readonly stripe?: Stripe;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService
  ) {
    const stripeKey = this.config.get<string>("STRIPE_SECRET_KEY");
    if (stripeKey && !stripeKey.includes("change_me")) {
      this.stripe = new Stripe(stripeKey);
    }
  }

  plans() {
    return this.prisma.plan.findMany({ where: { isPublic: true }, orderBy: { priceMonthly: "asc" } });
  }

  async createCheckout(userId: string, dto: CreateCheckoutDto) {
    const plan = await this.prisma.plan.findUnique({ where: { slug: dto.planSlug } });
    if (!plan) throw new BadRequestException("Plan not found");

    if (dto.provider === BillingProvider.STRIPE && this.stripe) {
      const session = await this.stripe.checkout.sessions.create({
        mode: "subscription",
        success_url: `${this.config.get("APP_URL")}/dashboard/billing?success=true`,
        cancel_url: `${this.config.get("APP_URL")}/pricing?canceled=true`,
        customer_email: (await this.prisma.user.findUnique({ where: { id: userId } }))?.email,
        line_items: [
          {
            price_data: {
              currency: plan.currency.toLowerCase(),
              recurring: { interval: "month" },
              unit_amount: Math.round(Number(plan.priceMonthly) * 100),
              product_data: { name: plan.name, description: plan.description }
            },
            quantity: 1
          }
        ],
        metadata: {
          userId,
          planId: plan.id,
          campaignType: dto.campaignType ?? "",
          toolId: dto.toolId ?? ""
        }
      });
      return { provider: dto.provider, checkoutUrl: session.url };
    }

    return {
      provider: dto.provider,
      checkoutUrl: `${this.config.get("APP_URL")}/dashboard/billing/checkout-placeholder?provider=${dto.provider}`,
      note: "Provider adapter configured. Add live credentials to create hosted checkout sessions."
    };
  }

  async subscriptionForUser(userId: string) {
    return this.prisma.subscription.findFirst({
      where: { userId },
      include: { plan: true },
      orderBy: { createdAt: "desc" }
    });
  }
}
