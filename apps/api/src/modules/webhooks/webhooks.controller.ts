import { Body, Controller, Headers, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { WebhooksService } from "./webhooks.service";

@ApiTags("Webhooks")
@Controller("webhooks")
export class WebhooksController {
  constructor(private readonly webhooks: WebhooksService) {}

  @Post("stripe")
  stripe(@Body() body: unknown, @Headers("stripe-signature") signature?: string) {
    return this.webhooks.handle("STRIPE", body, signature);
  }

  @Post("paypal")
  paypal(@Body() body: unknown, @Headers("paypal-transmission-id") signature?: string) {
    return this.webhooks.handle("PAYPAL", body, signature);
  }

  @Post("paddle")
  paddle(@Body() body: unknown, @Headers("paddle-signature") signature?: string) {
    return this.webhooks.handle("PADDLE", body, signature);
  }

  @Post("lemonsqueezy")
  lemon(@Body() body: unknown, @Headers("x-signature") signature?: string) {
    return this.webhooks.handle("LEMONSQUEEZY", body, signature);
  }
}

