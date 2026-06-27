import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { ToolsModule } from "./modules/tools/tools.module";
import { CategoriesModule } from "./modules/categories/categories.module";
import { ReviewsModule } from "./modules/reviews/reviews.module";
import { BookmarksModule } from "./modules/bookmarks/bookmarks.module";
import { CollectionsModule } from "./modules/collections/collections.module";
import { SearchModule } from "./modules/search/search.module";
import { RecommendationsModule } from "./modules/recommendations/recommendations.module";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { BillingModule } from "./modules/billing/billing.module";
import { ImporterModule } from "./modules/importer/importer.module";
import { ModerationModule } from "./modules/moderation/moderation.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { MessagesModule } from "./modules/messages/messages.module";
import { CmsModule } from "./modules/cms/cms.module";
import { DeveloperModule } from "./modules/developer/developer.module";
import { AuditModule } from "./modules/audit/audit.module";
import { SeoModule } from "./modules/seo/seo.module";
import { WebhooksModule } from "./modules/webhooks/webhooks.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [".env.local", ".env"] }),
    ThrottlerModule.forRoot([
      {
        ttl: 60_000,
        limit: 120
      }
    ]),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: { url: config.get<string>("REDIS_URL", "redis://localhost:6379") }
      })
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ToolsModule,
    CategoriesModule,
    ReviewsModule,
    BookmarksModule,
    CollectionsModule,
    SearchModule,
    RecommendationsModule,
    AnalyticsModule,
    BillingModule,
    ImporterModule,
    ModerationModule,
    NotificationsModule,
    MessagesModule,
    CmsModule,
    DeveloperModule,
    AuditModule,
    SeoModule,
    WebhooksModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
