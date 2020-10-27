import Mongoose from 'mongoose';
import Promise from 'bluebird';
import { CONSTANTS } from './../constants/constants';

export class DbConnect {
  static mongooseInstance: any;
  static mongooseConnection: Mongoose.Connection;
  constructor() {
    DbConnect.connect();
  }

  static connect(): Mongoose.Connection {
    if (this.mongooseInstance) return this.mongooseInstance;

    this.mongooseConnection = Mongoose.connection;

    this.mongooseConnection.once('open', () => {
      console.log('Connected to mongodb ', CONSTANTS.MONGO_DB_URL);
    });

    this.mongooseConnection.on('error', () => {
      console.log('Mongoose connection error');
    });
    (<any>Mongoose).Promise = Promise;
    this.mongooseInstance = Mongoose.connect(CONSTANTS.MONGO_DB_URL, <Mongoose.ConnectionOptions>{
      keepAlive: 300000,
      connectTimeoutMS: 300000,
      reconnectTries: 30,
      reconnectInterval: 30000,
    });
    return this.mongooseInstance;
  }
}
