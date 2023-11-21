import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Consumer } from 'src/api/integration/integration.consumer';

@ApiTags('RAWG Integration')
@Controller('integration')
export class IntegrationController {
  constructor(private readonly consumer: Consumer) {}

  @ApiOperation({ summary: 'Fetch data from RAWG and insert into db' })
  @Post('integrate')
  async integrateGames() {
    await this.consumer.fetchAndInsert({
      numberOfPages: 1,
      params: { page_size: 15 },
    });

    return { message: 'Games are merged into you db' };
  }
}
