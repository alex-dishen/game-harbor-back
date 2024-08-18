import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document<Types.ObjectId>;

export type UserDocumentWithoutPassword = Omit<User, 'password'> &
  Document<Types.ObjectId>;

@Schema()
export class User {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: false })
  is_deleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
