import mongoose from 'mongoose';

export interface IModel extends mongoose.Document {
  title: string;
  decsription: string;
  price: number;
  isActive: boolean;
  created_at: Date;
  updated_at: Date;
  created_by: mongoose.Types.ObjectId;
  updated_by: mongoose.Types.ObjectId;
}


