import {IModel } from './weather.model.interface';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
class WeatherSchema {

  static get schema() {
   return(new Schema({
      coord: {
        lon: {type:Number, required: true},
        lat: {type:Number, required: true}
      },
      weather: [
        {
        id:  {type:Number, required: true},
        main: {type:String, required: true},
        description: {type:String, required: true},
        icon: {type:String, required: true} 
        }
      ],
      visibility: {type:Number, required: true},
      timezone: {type:Number, required: true},
      id: {type:Number, required: true},
      name: {type:String, required: true},
      cod: {type:Number, required: true},
    }));
  }
}

export const schema = mongoose.model<IModel>('Weather-data', WeatherSchema.schema);
