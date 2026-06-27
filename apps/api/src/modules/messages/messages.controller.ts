import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CreateMessageDto } from "./dto/create-message.dto";
import { MessagesService } from "./messages.service";

@ApiTags("Messages")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("messages")
export class MessagesController {
  constructor(private readonly messages: MessagesService) {}

  @Get("inbox")
  inbox(@CurrentUser() user: { id: string }) {
    return this.messages.inbox(user.id);
  }

  @Get("sent")
  sent(@CurrentUser() user: { id: string }) {
    return this.messages.sent(user.id);
  }

  @Post()
  send(@CurrentUser() user: { id: string }, @Body() dto: CreateMessageDto) {
    return this.messages.send(user.id, dto);
  }
}

