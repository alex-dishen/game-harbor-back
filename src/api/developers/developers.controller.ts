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
import { CreateDeveloperDto, DevelopersDto } from 'src/api/developers/dto';
import { DevelopersService } from 'src/api/developers/developers.service';
import { MessageDto } from 'src/shared/dto';

@ApiTags('Developers')
@Controller('developers')
export class DevelopersController {
  constructor(private developersService: DevelopersService) {}

  @ApiOperation({ summary: 'Create a developer' })
  @ApiResponse({ status: 200, type: MessageDto })
  @Post('create')
  createDeveloper(@Body() data: CreateDeveloperDto) {
    return this.developersService.createDeveloper(data);
  }

  @ApiOperation({ summary: 'Get all developers' })
  @ApiResponse({ status: 200, type: [DevelopersDto] })
  @Get('all')
  getAllDeveloper() {
    return this.developersService.getAllDevelopers();
  }

  @ApiOperation({ summary: 'Get a developer' })
  @ApiResponse({ status: 200, type: DevelopersDto })
  @Get('/:id')
  getDeveloperById(@Param('id') id: string) {
    return this.developersService.getDeveloperById(id);
  }

  @ApiOperation({ summary: 'Update a developer' })
  @ApiResponse({ status: 200, type: MessageDto })
  @Put('/:id')
  updateDeveloper(@Param('id') id: string, @Body() data: CreateDeveloperDto) {
    return this.developersService.updateDeveloper(id, data);
  }

  @ApiOperation({ summary: 'Delete a game' })
  @ApiResponse({ status: 200, type: MessageDto })
  @Delete('/:id')
  deleteDeveloper(@Param('id') id: string) {
    return this.developersService.deleteDeveloper(id);
  }
}
