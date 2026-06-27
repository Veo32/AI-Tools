import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { NotificationType } from "@prisma/client";
import { IsEnum, IsOptional, IsString, IsUrl, Length } from "class-validator";

export class CreateNotificationDto {
  @ApiProperty()
  @IsString()
  userId!: string;

  @ApiProperty({ enum: NotificationType })
  @IsEnum(NotificationType)
  type!: NotificationType;

  @ApiProperty()
  @IsString()
  @Length(2, 120)
  title!: string;

  @ApiProperty()
  @IsString()
  @Length(2, 1000)
  body!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  actionUrl?: string;
}

