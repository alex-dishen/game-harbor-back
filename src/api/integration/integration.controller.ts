import { Controller, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Consumer } from 'src/api/integration/integration.consumer';

@ApiTags('RAWG Integration')
@Controller('integration')
export class IntegrationController {
  constructor(private readonly consumer: Consumer) {}

  @ApiOperation({ summary: 'Fetch data from RAWG and insert into db' })
  @Post('integrate')
  async integrateGames(
    @Query('number_of_pages') numberOfPages: number,
    @Query('items_per_page') itemsPerPage: number,
  ) {
    await this.consumer.fetchAndInsert({
      numberOfPages,
      params: { page_size: itemsPerPage > 40 ? 40 : itemsPerPage },
    });

    return { message: 'Games are merged into you db' };
  }
}
