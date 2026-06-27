import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PricingModel } from "@prisma/client";
import { IsArray, IsBoolean, IsEnum, IsOptional, IsString, IsUrl, Length, MaxLength } from "class-validator";

export class CreateToolDto {
  @ApiProperty()
  @IsString()
  @Length(2, 120)
  name!: string;

  @ApiProperty()
  @IsString()
  @Length(2, 140)
  slug!: string;

  @ApiProperty()
  @IsUrl()
  websiteUrl!: string;

  @ApiProperty()
  @IsString()
  @Length(20, 220)
  shortDescription!: string;

  @ApiProperty()
  @IsString()
  @Length(60, 20000)
  description!: string;

  @ApiProperty()
  @IsString()
  categoryId!: string;

  @ApiProperty({ enum: PricingModel })
  @IsEnum(PricingModel)
  pricingModel!: PricingModel;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  platforms?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  apiAvailable?: boolean;
}

