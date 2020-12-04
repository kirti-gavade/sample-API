import mongoose from 'mongoose';

export class BaseModel<T extends mongoose.Document> {

  private _model: mongoose.Model<mongoose.Document>;

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this._model = schemaModel;
  }

  create(item: T, callback: (error: any, result: any) => void) {
    this._model.create(item, callback);
  }

  retrieve(cond: Object, callback: (error: any, result: any) => void) {
    this._model.find(cond, callback);
  }

  retrieveWithFields(cond: Object, fields: Object, callback: (error: any, result: any) => void) {
    this._model.find(cond, fields, callback);
  }

  retrieveWithOptions(cond: Object, fields: Object, options: Object,
                      callback: (error: any, result: any) => void) {
    this._model.find(cond, fields, options, callback);
  }

  update(_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
    this._model.update({ _id }, item, callback);
  }

  updateWithOptions(cond: Object, fields: Object, options: Object,
                    callback: (error: any, rawResponse: any) => void) {
    this._model.update(cond, fields, options, callback);
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._model.remove({ _id: this.toObjectId(_id) }, err => callback(err, null));
  }

  deleteWithOptions(cond: Object, callback: (error: any, result: any) => void) {
    this._model.remove(cond, err => callback(err, null));
  }

  findById(_id: string, callback: (error: any, result: T) => void) {
    this._model.findById(_id, callback);
  }

  findOne(cond: Object, fields: Object, callback: (err: any, res: any) => void) {
    this._model.findOne(cond, fields, callback);
  }

  query(cond: Object, modifiers: any, callback: (error: any, result: any) => void) {
    const findQuery = this._model.find(cond);
    const findQueryKeys = Object.keys(modifiers);
    findQueryKeys.map((key) => {
      if (key === 'select') {
        findQuery.select(modifiers[key]);
      }
      if (key === 'skip') {
        findQuery.skip(modifiers[key]);
      }
      if (key === 'limit') {
        findQuery.limit(modifiers[key]);
      }
      if (key === 'sort') {
        findQuery.sort(modifiers[key]);
      }
    });
    findQuery.exec(callback);
  }

  private toObjectId(_id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId.createFromHexString(_id);
  }

  findByIdAndUpdate(_id: string, update: Object, callback: (error: any, result: any) => void) {
    this._model.findByIdAndUpdate(_id, update, { new: true }, callback);
  }

  findOneAndUpdate(conditions: Object, update: Object,
                   callback: (error: any, result: any) => void) {
    this._model.findOneAndUpdate(conditions, update, { new: true }, callback);
  }

  count(cond: Object, callback: (error: any, result: any) => void) {
    this._model.count(cond, callback);
  }

  remove(callback: (error: any, result: any) => void) {
    this._model.remove({}, err => callback(err, null));
  }

  removeWithCondition(cond: Object, callback: (error: any, result: any) => void) {
    this._model.remove(cond, err => callback(err, null));
  }

  aggregate(cond: any[], callback: (error: any, result: any) => void) {
    this._model.aggregate(cond, callback);
  }
  distinct(field: string, cond: Object, callback: (error: any, result: any) => void) {
    this._model.distinct(field, <any>cond, callback);
  }
}
