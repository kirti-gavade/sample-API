import mongoose from 'mongoose';

export class BaseModel<T extends mongoose.Document> {

  private readonly model: mongoose.Model<mongoose.Document>;

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this.model = schemaModel;
  }

  create = async (item: T | T[], callback?: (error: any, result: any) => void) => {
    if (callback) {
      this.model.create(item, callback);
      return null;
    }else {
      return this.model.create(item);
    }
  }
}
