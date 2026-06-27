import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { ImporterController } from "./importer.controller";
import { ImporterProcessor } from "./importer.processor";
import { ImporterService } from "./importer.service";

@Module({
  imports: [BullModule.registerQueue({ name: "tool-imports" })],
  controllers: [ImporterController],
  providers: [ImporterService, ImporterProcessor]
})
export class ImporterModule {}

