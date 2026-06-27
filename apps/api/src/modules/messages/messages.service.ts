import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateMessageDto } from "./dto/create-message.dto";

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  inbox(userId: string) {
    return this.prisma.message.findMany({
      where: { recipientId: userId },
      include: { sender: { select: { id: true, name: true, avatarUrl: true } } },
      orderBy: { createdAt: "desc" },
      take: 100
    });
  }

  sent(userId: string) {
    return this.prisma.message.findMany({
      where: { senderId: userId },
      include: { recipient: { select: { id: true, name: true, avatarUrl: true } } },
      orderBy: { createdAt: "desc" },
      take: 100
    });
  }

  send(senderId: string, dto: CreateMessageDto) {
    return this.prisma.message.create({
      data: {
        senderId,
        recipientId: dto.recipientId,
        subject: dto.subject,
        body: dto.body
      }
    });
  }
}

