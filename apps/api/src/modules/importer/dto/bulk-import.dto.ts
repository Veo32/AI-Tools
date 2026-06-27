import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsObject, IsOptional, IsString, IsUrl } from "class-validator";

export class BulkImportDto {
  @ApiProperty({ example: "vendor-csv-upload" })
  @IsString()
  source!: string;

  @ApiProperty({ enum: ["csv", "api", "json"] })
  @IsIn(["csv", "api", "json"])
  format!: "csv" | "api" | "json";

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  sourceUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  csvText?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  mapping?: Record<string, string>;
}

