import "reflect-metadata";
import compression from "compression";
import cookieParser from "cookie-parser";
import csrf from "csurf";
import helmet from "helmet";
import type { NextFunction, Request, Response } from "express";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { XssSanitizePipe } from "./common/pipes/xss-sanitize.pipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);
  const origins = config.get<string>("CORS_ORIGINS", "http://localhost:3000").split(",");

  app.setGlobalPrefix("v1");
  app.enableCors({
    origin: origins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
  });
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.use(compression());
  app.use(cookieParser(config.get<string>("COOKIE_SECRET", "dev-cookie-secret")));
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith("/v1/webhooks")) return next();
    return csrf({ cookie: { httpOnly: true, sameSite: "lax", secure: config.get("NODE_ENV") === "production" } })(
      req,
      res,
      next
    );
  });
  app.useGlobalPipes(
    new XssSanitizePipe(),
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const swaggerConfig = new DocumentBuilder()
    .setTitle("AI Tools Directory API")
    .setDescription("REST API for AI tools discovery, monetization, analytics, and developer access.")
    .setVersion("1.0.0")
    .addBearerAuth()
    .addApiKey({ type: "apiKey", name: "x-api-key", in: "header" }, "api-key")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, document, {
    swaggerOptions: { persistAuthorization: true }
  });

  await app.listen(config.get<number>("PORT", 4000));
}

bootstrap();
