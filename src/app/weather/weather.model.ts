import { IModel } from './weather.model.interface';
import { schema } from './weather.schema';
import { BaseModel } from '../../core/models/base.model';

export class WeatherModel extends BaseModel<IModel> {
  constructor() {
    super(schema);
  }
}

Object.seal(WeatherModel);
