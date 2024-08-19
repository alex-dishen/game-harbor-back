import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  User,
  UserDocument,
  UserDocumentWithoutPassword,
} from '../../../schemas/user.schema';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserDto, UserDto } from './dto/user.dto';
import { paginate } from 'src/shared/helpers/paginate';
import { PaginatedResult } from 'src/shared/dto/pagination.dto';
import { hash } from 'argon2';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: CreateUserDto): Promise<UserDto> {
    const hashedPassword = await hash(data.password);
    const updatedData = { ...data, password: hashedPassword };

    const createdUser = new this.userModel(updatedData);
    const savedUser = (await createdUser.save()).toJSON();

    delete savedUser.password;

    return savedUser;
  }

  async getById(userId: string): Promise<UserDocumentWithoutPassword> {
    return this.userModel.findById(userId);
  }

  async getBy(filter: FilterQuery<User>): Promise<UserDocument> {
    return this.userModel.findOne(filter, {
      email: 1,
      phone: 1,
      password: 1,
      lastName: 1,
      createdAt: 1,
      firstName: 1,
      isDeleted: 1,
    });
  }

  getAll(
    take: number,
    skip: number,
    filter: FilterQuery<User> = {},
  ): Promise<PaginatedResult<UserDocumentWithoutPassword>> {
    return paginate<User, UserDocumentWithoutPassword>({
      model: this.userModel,
      filter,
      options: {
        take,
        skip,
      },
    });
  }

  async update(
    userId: string,
    data: Partial<User>,
  ): Promise<UserDocumentWithoutPassword> {
    let dataToUpdate = data;

    if (data.password) {
      const hashedPassword = await hash(data.password);
      dataToUpdate = { ...data, password: hashedPassword };
    }

    return this.userModel.findByIdAndUpdate(userId, dataToUpdate, {
      new: true,
    });
  }

  delete(userId: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(userId).exec();
  }
}
