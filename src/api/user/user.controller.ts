import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto/user.dto';
import { MessageDto } from 'src/shared/dto/message.dto';
import { PaginatedResult, PaginationDto } from 'src/shared/dto/pagination.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 200, type: UserDto })
  @Post('/create')
  createUser(@Body() data: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(data);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserDto] })
  @Get('/all')
  getAllUsers(
    @Query() pagination: PaginationDto,
  ): Promise<PaginatedResult<UserDto>> {
    return this.userService.getAllUsers(pagination);
  }

  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, type: UserDto })
  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<UserDto> {
    return this.userService.getUser(id);
  }

  @ApiOperation({ summary: 'Update user information' })
  @ApiResponse({ status: 200, type: UserDto })
  @Put('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<UserDto> {
    console.log(data);
    return this.userService.updateUser(id, data);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, type: MessageDto })
  @Delete('/:id')
  deleteUser(@Param('id') id: string): Promise<MessageDto> {
    return this.userService.deleteUser(id);
  }

  @ApiOperation({
    summary: 'Soft delete a user, marks the user as deleted in the system',
  })
  @ApiResponse({ status: 200, type: MessageDto })
  @Delete('soft-delete/:id')
  softDeleteUser(@Param('id') id: string): Promise<MessageDto> {
    return this.userService.softDeleteUser(id);
  }
}