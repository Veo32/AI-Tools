import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SearchDto } from "./dto/search.dto";
import { SearchService } from "./search.service";

@ApiTags("Search")
@Controller("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  search(@Query() query: SearchDto) {
    return this.searchService.search(query);
  }
}

