import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from './dto/user.dto';
import { MessageDto } from 'src/shared/dto/message.dto';
import { PaginatedResult, PaginationDto } from 'src/shared/dto/pagination.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { GetUser } from 'src/shared/decorators/get-user.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200, type: UserDto })
  @Get('/current')
  getCurrentUser(@GetUser('sub') userId: string): Promise<UserDto> {
    return this.userService.getUser(userId);
  }

  @ApiOperation({ summary: 'Update current user' })
  @ApiResponse({ status: 200, type: UserDto })
  @Put('/current')
  updateCurrentUser(
    @GetUser('sub') userId: string,
    @Body() data: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, data);
  }

  @ApiOperation({ summary: 'Delete current user' })
  @ApiResponse({ status: 200, type: MessageDto })
  @Delete('/current')
  deleteCurrentUser(@GetUser('sub') userId: string): Promise<MessageDto> {
    return this.userService.deleteUser(userId);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserDto] })
  @Get()
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
    return this.userService.updateUser(id, data);
  }

  @ApiOperation({
    summary: 'Soft delete a user, marks the user as deleted in the system',
  })
  @ApiResponse({ status: 200, type: MessageDto })
  @Patch('/:id/status')
  softDeleteUser(@Param('id') id: string): Promise<MessageDto> {
    return this.userService.softDeleteUser(id);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, type: MessageDto })
  @Delete('/:id')
  deleteUser(@Param('id') id: string): Promise<MessageDto> {
    return this.userService.deleteUser(id);
  }
}
