import { Transform } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

function split(value: unknown): string[] | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) return value.flatMap((item) => String(item).split(",")).filter(Boolean);
  return String(value).split(",").filter(Boolean);
}

export class QueryToolsDto {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @Transform(({ value }) => split(value))
  tags?: string[];

  @IsOptional()
  @Transform(({ value }) => split(value))
  pricing?: string[];

  @IsOptional()
  @IsIn(["relevance", "newest", "rating", "popular", "sponsored"])
  sort?: string = "relevance";

  @IsOptional()
  @Transform(({ value }) => Number(value ?? 1))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => Number(value ?? 24))
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 24;
}

