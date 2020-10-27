export class CONSTANTS {
  static NODE_ENV: string = process.env.NODE_ENV || 'development';
  static MONGO_DB_URL: string = process.env.MONGO_DB_URL ||
    'mongodb+srv://test:test@test-cluster.bvnzl.mongodb.net/test';
 static STATUS_ERROR_CODE = 400;
 static STATUS_SUCCESS_CODE = 200;
}
Object.seal(CONSTANTS);
