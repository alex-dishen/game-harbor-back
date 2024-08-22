import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'argon2';
import { Model, Types } from 'mongoose';
import { UserSession, UserSessionDocument } from 'schemas/user-session.schema';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(UserSession.name) private userSessionModel: Model<UserSession>,
  ) {}

  getUserSessionById(id: string): Promise<UserSessionDocument> {
    return this.userSessionModel.findById(id);
  }

  async createUserSession(
    id: Types.ObjectId,
    token: string,
    userId: string,
    expiresAt: Date,
  ): Promise<UserSessionDocument> {
    const hashedToken = await hash(token);

    const userSession = new this.userSessionModel({
      userId,
      _id: id,
      expiresAt,
      token: hashedToken,
    });
    return userSession.save();
  }

  async updateUserSession(
    sessionId: string,
    data: Partial<UserSession>,
  ): Promise<UserSessionDocument> {
    const { token, ...restData } = data;
    const hashedRefreshToken = await hash(token);

    return this.userSessionModel.findByIdAndUpdate(
      sessionId,
      { ...restData, token: hashedRefreshToken },
      { new: true },
    );
  }

  deleteUserSession(sessionId: string): Promise<UserSessionDocument> {
    return this.userSessionModel.findByIdAndDelete(sessionId);
  }
}
