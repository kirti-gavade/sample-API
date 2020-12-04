export class CONSTANTS {
  static NODE_ENV: string = process.env.NODE_ENV || 'development';
  static MONGO_DB_URL: string = process.env.MONGO_DB_URL ||
    'mongodb+srv://test:test@test-cluster.bvnzl.mongodb.net/test';
 static STATUS_ERROR_CODE = 400;
 static STATUS_SUCCESS_CODE = 200;
 static REQUEST_ERROR_MSG = 'Something went wrong!';
 static REQUEST_SUCCESS_MSG = 'Successfully sent response';
 static AUTH_ERROR_MSG ='Authentication failed !';
 static JWT_SECRET: string = 'LA9prjchRrgZZgAcRztQr2ZVnLYL7QeG3vT6V2U5FfSuyi8RXY4zXQ7urXif';
 static CHK_AUTH_USER = true;
}
Object.seal(CONSTANTS);
