import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AppDto, CreatePhraseAndPlanet } from './app.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get phrase and planet name' })
  @ApiResponse({ status: 200, type: AppDto })
  @Get('/all')
  getHello(): AppDto {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Create phrase with planet' })
  @ApiResponse({ status: 200, type: CreatePhraseAndPlanet })
  @Post('/create')
  createPhraseWithPlanet(
    @Body() data: CreatePhraseAndPlanet,
  ): CreatePhraseAndPlanet {
    return data;
  }
}
