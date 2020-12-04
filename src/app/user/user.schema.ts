import { IUserModel } from './user.model.interface';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
class UserSchema {

  static get schema() {
    const schema = new Schema({
      email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
      },
      first_name: {
        type: String,
        required: true,
      },
      last_name: {
        type: String,
        required: true,
      },
      user_type: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true,
      },
      gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male',
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      created_at: {
        type: Number,
        default: Date.now,
      },
      updated_at: {
        type: Number,
        default: Date.now,
      },
      token: {
        type: String
      },
      created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: false,
        default: null,
      },
      updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: false,
        default: null,
      },
    });
    return schema;
  }
}

export const userSchema = mongoose.model<IUserModel>('Users', UserSchema.schema);
