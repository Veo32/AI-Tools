import { Module } from "@nestjs/common";
import { ToolsModule } from "../tools/tools.module";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";

@Module({
  imports: [ToolsModule],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService]
})
export class SearchModule {}

