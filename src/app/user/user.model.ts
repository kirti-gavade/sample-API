import { IUserModel } from './user.model.interface';
import { userSchema } from './user.schema';
import { BaseModel } from './../../core/models/base.model';

export class UserModel extends BaseModel<IUserModel> {
  constructor() {
    super(userSchema);
  }
}

Object.seal(UserModel);
