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

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: CreateUserDto): Promise<UserDto> {
    const createdUser = new this.userModel(data);
    const savedUser = (await createdUser.save()).toJSON();

    delete savedUser.password;

    return savedUser;
  }

  getById(userId: string): Promise<UserDocumentWithoutPassword> {
    return this.userModel.findById(userId).exec();
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

  update(userId: string, data: Partial<User>): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(userId, data, { new: true });
  }

  delete(userId: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(userId).exec();
  }
}
