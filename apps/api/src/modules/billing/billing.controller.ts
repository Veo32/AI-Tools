import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { BillingService } from "./billing.service";
import { CreateCheckoutDto } from "./dto/create-checkout.dto";

@ApiTags("Billing")
@Controller("billing")
export class BillingController {
  constructor(private readonly billing: BillingService) {}

  @Get("plans")
  plans() {
    return this.billing.plans();
  }

  @Post("checkout")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createCheckout(@CurrentUser() user: { id: string }, @Body() dto: CreateCheckoutDto) {
    return this.billing.createCheckout(user.id, dto);
  }

  @Get("subscription")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  subscription(@CurrentUser() user: { id: string }) {
    return this.billing.subscriptionForUser(user.id);
  }
}

