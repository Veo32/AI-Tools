import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @ApiProperty({ example: "founder@example.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "Ada Founder" })
  @IsString()
  name!: string;

  @ApiProperty({ minLength: 10, example: "ChangeMe123!" })
  @IsString()
  @MinLength(10)
  password!: string;
}

