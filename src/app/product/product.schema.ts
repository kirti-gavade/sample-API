import {IModel } from './product.model.interface';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
class ProductSchema {

  static get schema() {
   return(new Schema( {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isActive: {
      type:Boolean,
      required:true,
      default: true
    },
    created_at: {
      type: Number,
      default: Date.now,
    },
    updated_at: {
      type: Number,
      default: Date.now,
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
  }));
  }
}

export const schema = mongoose.model<IModel>('product', ProductSchema.schema);
