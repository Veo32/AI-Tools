import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 100
    });
  }

  create(dto: CreateNotificationDto) {
    return this.prisma.notification.create({ data: dto });
  }

  async markRead(userId: string, id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { readAt: new Date() }
    });
  }
}

