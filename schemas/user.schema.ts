import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export type UserDocumentWithoutPassword = HydratedDocument<
  Omit<User, 'password'>
>;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
