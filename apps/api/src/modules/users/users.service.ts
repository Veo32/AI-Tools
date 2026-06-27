import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findMe(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        avatarUrl: true,
        bio: true,
        locale: true,
        roles: true,
        createdAt: true,
        subscriptions: { include: { plan: true }, orderBy: { createdAt: "desc" }, take: 1 }
      }
    });
  }

  updateMe(userId: string, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: dto,
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        avatarUrl: true,
        bio: true,
        locale: true,
        roles: true
      }
    });
  }

  list() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      select: {
        id: true,
        email: true,
        name: true,
        roles: true,
        createdAt: true,
        lastLoginAt: true
      }
    });
  }
}

