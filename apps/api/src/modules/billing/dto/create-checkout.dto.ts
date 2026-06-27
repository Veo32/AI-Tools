import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BillingProvider, CampaignType } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class CreateCheckoutDto {
  @ApiProperty()
  @IsString()
  planSlug!: string;

  @ApiProperty({ enum: BillingProvider })
  @IsEnum(BillingProvider)
  provider!: BillingProvider;

  @ApiPropertyOptional({ enum: CampaignType })
  @IsOptional()
  @IsEnum(CampaignType)
  campaignType?: CampaignType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  toolId?: string;
}

