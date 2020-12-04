import { IModel } from './product.model.interface';
import { schema } from './product.schema';
import { BaseModel } from '../../core/models/base.model';

export class ProductModel extends BaseModel<IModel> {
  constructor() {
    super(schema);
  }
}

Object.seal(ProductModel);
