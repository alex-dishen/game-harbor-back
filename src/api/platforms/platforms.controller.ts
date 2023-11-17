import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlatformsService } from 'src/api/platforms/platforms.service';
import { CreatePlatformDto, PlatformDto } from 'src/api/platforms/dto';
import { MessageDto } from 'src/shared/dto';

@ApiTags('Platforms')
@Controller('platforms')
export class PlatformsController {
  constructor(private platformsService: PlatformsService) {}

  @ApiOperation({ summary: 'Create a platform' })
  @ApiResponse({ status: 200, type: MessageDto })
  @Post('/create')
  createPlatform(@Body() data: CreatePlatformDto) {
    return this.platformsService.createPlatform(data);
  }

  @ApiOperation({ summary: 'Get all platforms' })
  @ApiResponse({ status: 200, type: [PlatformDto] })
  @Get('/all')
  getAllGames() {
    return this.platformsService.getAllPlatforms();
  }

  @ApiOperation({ summary: 'Get a single platform by id' })
  @ApiResponse({ status: 200, type: PlatformDto })
  @Get('/:id')
  getGameById(@Param('id') id: string) {
    return this.platformsService.getPlatformById(id);
  }

  @ApiOperation({ summary: 'Update a platform' })
  @ApiResponse({ status: 200, type: MessageDto })
  @Put('/:id')
  updatePlatform(@Param('id') id: string, @Body() data: CreatePlatformDto) {
    return this.platformsService.updatePlatform(id, data);
  }

  @ApiOperation({ summary: 'Delete a platform' })
  @ApiResponse({ status: 200, type: MessageDto })
  @Delete('/:id')
  deletePlatform(@Param('id') id: string) {
    return this.platformsService.deletePlatform(id);
  }
}
