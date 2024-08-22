import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type UserSessionDocument = HydratedDocument<UserSession>;

@Schema()
export class UserSession {
  @Prop({ required: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  token: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ ref: 'User', required: true, type: MongooseSchema.Types.ObjectId })
  userId: MongooseSchema.Types.ObjectId;
}

export const UserSessionSchema = SchemaFactory.createForClass(UserSession);
