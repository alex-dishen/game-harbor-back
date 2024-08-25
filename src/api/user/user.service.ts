import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UpdateUserDto, UserDto } from './dto/user.dto';
import { MessageDto } from 'src/shared/dto/message.dto';
import { PaginatedResult, PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUser(userId: string): Promise<UserDto> {
    return this.userRepository.getById(userId);
  }

  async getAllUsers({
    skip,
    take,
  }: PaginationDto): Promise<PaginatedResult<UserDto>> {
    return this.userRepository.getAll(take, skip);
  }

  updateUser(userId: string, data: Partial<UpdateUserDto>): Promise<UserDto> {
    return this.userRepository.update(userId, data);
  }

  async deleteUser(userId: string): Promise<MessageDto> {
    await this.userRepository.delete(userId);

    return { message: 'Successfully deleted a user' };
  }

  async softDeleteUser(userId: string): Promise<MessageDto> {
    await this.userRepository.update(userId, { isDeleted: true });

    return { message: 'Successfully soft deleted a user' };
  }
}
