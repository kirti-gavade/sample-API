import mongoose from 'mongoose';

export interface IModel extends mongoose.Document,IWeather {
  coord?: {
    lon?: number,
    lat?: number
  },
  weather?: [IWeather],
  visibility?: number,
  timezone?: number,
  id?: number,
  name?: string,
  cod?: number
}

export interface IWeather {
    id?: number,
    main?: string,
    description?: string,
    icon?:string 
}
