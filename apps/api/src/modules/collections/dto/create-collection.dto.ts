import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";

export class CreateCollectionDto {
  @ApiProperty()
  @IsString()
  @Length(2, 120)
  title!: string;

  @ApiProperty()
  @IsString()
  @Length(2, 140)
  slug!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}

