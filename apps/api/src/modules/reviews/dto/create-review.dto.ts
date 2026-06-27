import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Length, Max, Min } from "class-validator";

export class CreateReviewDto {
  @ApiProperty()
  @IsString()
  toolId!: string;

  @ApiProperty({ minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @ApiProperty()
  @IsString()
  @Length(3, 100)
  title!: string;

  @ApiProperty()
  @IsString()
  @Length(20, 2500)
  body!: string;
}

