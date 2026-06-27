import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcryptjs";
import { createHash } from "node:crypto";
import { PrismaService } from "../../prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService
  ) {}

  async register(dto: RegisterDto, context: { ip?: string; userAgent?: string }) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException("Email already registered");

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        passwordHash,
        roles: ["USER"]
      }
    });

    await this.audit(user.id, "auth.register", "User", user.id, context);
    return this.issueTokens(user, context);
  }

  async login(dto: LoginDto, context: { ip?: string; userAgent?: string }) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException("Invalid credentials");

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException("Invalid credentials");

    await this.prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
    await this.audit(user.id, "auth.login", "User", user.id, context);
    return this.issueTokens(user, context);
  }

  async refresh(dto: RefreshTokenDto, context: { ip?: string; userAgent?: string }) {
    const refreshTokenHash = createHash("sha256").update(dto.refreshToken).digest("hex");
    const session = await this.prisma.session.findFirst({
      where: {
        refreshTokenHash,
        revokedAt: null,
        expiresAt: { gt: new Date() }
      },
      include: { user: true }
    });
    if (!session) throw new UnauthorizedException("Invalid refresh token");

    await this.prisma.session.update({
      where: { id: session.id },
      data: { revokedAt: new Date() }
    });
    return this.issueTokens(session.user, context);
  }

  async logout(refreshToken: string) {
    const refreshTokenHash = createHash("sha256").update(refreshToken).digest("hex");
    await this.prisma.session.updateMany({
      where: { refreshTokenHash, revokedAt: null },
      data: { revokedAt: new Date() }
    });
    return { ok: true };
  }

  private async issueTokens(
    user: { id: string; email: string; roles: string[] },
    context: { ip?: string; userAgent?: string }
  ) {
    const payload = { sub: user.id, email: user.email, roles: user.roles };
    const accessToken = await this.jwt.signAsync(payload, {
      secret: this.config.get<string>("JWT_ACCESS_SECRET", "dev-access-secret"),
      expiresIn: this.config.get<string>("JWT_ACCESS_TTL", "15m")
    });
    const refreshToken = await this.jwt.signAsync(payload, {
      secret: this.config.get<string>("JWT_REFRESH_SECRET", "dev-refresh-secret"),
      expiresIn: this.config.get<string>("JWT_REFRESH_TTL", "30d")
    });

    await this.prisma.session.create({
      data: {
        userId: user.id,
        refreshTokenHash: createHash("sha256").update(refreshToken).digest("hex"),
        ipAddress: context.ip,
        userAgent: context.userAgent,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
      }
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        roles: user.roles
      },
      accessToken,
      refreshToken
    };
  }

  private async audit(
    actorId: string,
    action: string,
    entity: string,
    entityId: string,
    context: { ip?: string; userAgent?: string }
  ) {
    await this.prisma.auditLog.create({
      data: {
        actorId,
        action,
        entity,
        entityId,
        ipAddress: context.ip,
        userAgent: context.userAgent
      }
    });
  }
}

