import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { BulkImportDto } from "./dto/bulk-import.dto";
import { ImporterService } from "./importer.service";

@ApiTags("Importer")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.EDITOR)
@Controller("importer")
export class ImporterController {
  constructor(private readonly importer: ImporterService) {}

  @Post("bulk")
  bulk(@Body() dto: BulkImportDto) {
    return this.importer.createJob(dto);
  }

  @Get("jobs")
  listJobs() {
    return this.importer.listJobs();
  }

  @Post("duplicates/:toolId")
  detectDuplicates(@Param("toolId") toolId: string) {
    return this.importer.detectDuplicates(toolId);
  }
}

