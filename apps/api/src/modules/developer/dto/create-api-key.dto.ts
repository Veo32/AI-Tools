import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateApiKeyDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  scopes?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(100)
  @Max(1000000)
  rateLimit?: number;
}

