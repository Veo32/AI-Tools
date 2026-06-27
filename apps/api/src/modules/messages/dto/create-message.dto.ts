import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateMessageDto {
  @ApiProperty()
  @IsString()
  recipientId!: string;

  @ApiProperty()
  @IsString()
  @Length(2, 160)
  subject!: string;

  @ApiProperty()
  @IsString()
  @Length(2, 5000)
  body!: string;
}

