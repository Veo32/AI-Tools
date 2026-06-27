import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { createHash } from "node:crypto";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers["x-api-key"];
    if (!apiKey || typeof apiKey !== "string") throw new UnauthorizedException("Missing API key");

    const keyHash = createHash("sha256").update(apiKey).digest("hex");
    const record = await this.prisma.apiKey.findFirst({
      where: {
        keyHash,
        status: "ACTIVE",
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }]
      },
      include: { user: true }
    });

    if (!record) throw new UnauthorizedException("Invalid API key");
    await this.prisma.apiKey.update({ where: { id: record.id }, data: { lastUsedAt: new Date() } });
    request.apiKey = record;
    request.user = {
      id: record.user.id,
      email: record.user.email,
      roles: record.user.roles
    };
    return true;
  }
}

