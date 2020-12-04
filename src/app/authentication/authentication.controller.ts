import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CONSTANTS } from './../../config/constants/constants';

export class AuthenticationController {
  /**
  * @private
  * @type {string}
  */

  constructor() {
  }

  ensureAuthorized(req: any, res: Response, next: NextFunction): void {
    if (CONSTANTS.CHK_AUTH_USER === true) {
      let bearerToken: any;
      const bearerHeader = req.headers.authorization;
      const sys_user_id = req.body.user_id;
      if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        bearerToken = bearer[1];
        // verifies secret and checks exp
        jwt.verify(bearerToken,
                   process.env.JWT_SECRET, { ignoreExpiration: true }, (err: any, decoded: any) => {
                     if (err) {
                       return res.status(403).send({
                         status: CONSTANTS.STATUS_ERROR_CODE,
                         message: CONSTANTS.AUTH_ERROR_MSG,
                       });
                     }
          // if everything is good, save to request for use in other routes
                     if (decoded.user_id !== sys_user_id) {
                       return res.status(403).send({
                         status: CONSTANTS.STATUS_ERROR_CODE,
                         message: CONSTANTS.AUTH_ERROR_MSG
                       });
                     }
                     req.token = bearerToken;
                     next();
                   });
      } else {
        res.status(403).send({
          status: CONSTANTS.STATUS_ERROR_CODE,
          message: CONSTANTS.AUTH_ERROR_MSG,
        });
      }
    } else {
      next();
    }
  }
}
