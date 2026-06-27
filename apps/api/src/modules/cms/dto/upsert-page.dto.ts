import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Locale } from "@prisma/client";
import { IsArray, IsBoolean, IsEnum, IsObject, IsOptional, IsString, Length } from "class-validator";

export class UpsertPageDto {
  @ApiProperty()
  @IsString()
  @Length(1, 160)
  slug!: string;

  @ApiProperty({ enum: Locale })
  @IsEnum(Locale)
  locale!: Locale;

  @ApiProperty()
  @IsString()
  @Length(2, 180)
  title!: string;

  @ApiProperty()
  @IsArray()
  blocks!: Array<Record<string, unknown>>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  published?: boolean;
}

