import { Injectable } from "@nestjs/common";
import { BillingProvider, Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class WebhooksService {
  constructor(private readonly prisma: PrismaService) {}

  async handle(provider: BillingProvider, body: unknown, signature?: string) {
    await this.prisma.auditLog.create({
      data: {
        action: `webhook.${provider.toLowerCase()}`,
        entity: "BillingWebhook",
        metadata: { provider, signaturePresent: Boolean(signature), body: body as Prisma.InputJsonValue }
      }
    });
    return { received: true };
  }
}
