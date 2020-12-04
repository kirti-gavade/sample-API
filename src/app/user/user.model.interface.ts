import mongoose from 'mongoose';

export interface IUserModel extends mongoose.Document {
  email: string;
  first_name: string;
  last_name: string;
  user_type: string;
  password: string;
  token: String;
  created_at: Date;
  updated_at: Date;
  created_by: mongoose.Types.ObjectId;
  updated_by: mongoose.Types.ObjectId;
}
