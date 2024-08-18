import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto/user.dto';
import { MessageDto } from 'src/shared/dto/message.dto';
import { PaginatedResult, PaginationDto } from 'src/shared/dto/pagination.dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: CreateUserDto): Promise<UserDto> {
    const hashedPassword = await hash(data.password);
    const updatedData = { ...data, password: hashedPassword };

    return this.userRepository.create(updatedData);
  }

  async getUser(userId: string): Promise<UserDto> {
    return this.userRepository.getById(userId);
  }

  async getAllUsers({
    skip,
    take,
  }: PaginationDto): Promise<PaginatedResult<UserDto>> {
    return this.userRepository.getAll(take, skip);
  }

  async updateUser(
    userId: string,
    data: Partial<UpdateUserDto>,
  ): Promise<UserDto> {
    let dataToUpdate = data;

    if (data.password) {
      const hashedPassword = await hash(data.password);
      dataToUpdate = { ...data, password: hashedPassword };
    }

    return this.userRepository.update(userId, dataToUpdate);
  }

  async deleteUser(userId: string): Promise<MessageDto> {
    await this.userRepository.delete(userId);

    return { message: 'Successfully deleted a user' };
  }

  async softDeleteUser(userId: string): Promise<MessageDto> {
    await this.userRepository.update(userId, { is_deleted: true });

    return { message: 'Successfully soft deleted a user' };
  }
}
