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
import { PublishersService } from 'src/api/publishers/publishers.service';
import { CreatePublisherDto, PublisherDto } from 'src/api/publishers/dto';
import { MessageDto } from 'src/shared/dto';

@ApiTags('Publishers')
@Controller('publishers')
export class PublishersController {
  constructor(private publishersService: PublishersService) {}

  @ApiOperation({ summary: 'Create a publisher' })
  @ApiResponse({ status: 200, type: MessageDto })
  @Post('create')
  createPublisher(@Body() data: CreatePublisherDto) {
    return this.publishersService.createPublisher(data);
  }

  @ApiOperation({ summary: 'Get all publishers' })
  @ApiResponse({ status: 200, type: [PublisherDto] })
  @Get('/all')
  getAllPublishers() {
    return this.publishersService.getAllPublishers();
  }

  @ApiOperation({ summary: 'Get a publisher' })
  @ApiResponse({ status: 200, type: PublisherDto })
  @Get('/:id')
  getPublisher(@Param('id') id: string) {
    return this.publishersService.getPublisherById(id);
  }

  @ApiOperation({ summary: 'Updated a publisher' })
  @ApiResponse({ status: 200, type: MessageDto })
  @Put('/:id')
  updatePublisher(@Param('id') id: string, @Body() data: CreatePublisherDto) {
    return this.publishersService.updatePublisher(id, data);
  }

  @ApiOperation({ summary: 'Delete a publisher' })
  @ApiResponse({ status: 200, type: MessageDto })
  @Delete('/:id')
  deletePublisher(@Param('id') id: string) {
    return this.publishersService.deletePublisher(id);
  }
}
