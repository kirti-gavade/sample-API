import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { UserModel } from './user.model';
import { IUserModel } from './user.model.interface';
import { CONSTANTS } from '../../config/constants/constants';

export class UserController {
  private _userModule: UserModel;

  constructor() {
    this._userModule = new UserModel();
  }

  create(req: Request, res: Response): void {
    try {
      const user: IUserModel = req.body;
      this._userModule.create(user, (error: any, userResult: IUserModel) => {
        if (error) {
          console.log(error);
          return res.send({ status: CONSTANTS.STATUS_ERROR_CODE, message: CONSTANTS.REQUEST_ERROR_MSG  });
        }
        this.createUserToken(userResult, res);
      });
      
    } catch (e) {
     console.log(e);
      res.send({ status: CONSTANTS.STATUS_ERROR_CODE, message: CONSTANTS.REQUEST_ERROR_MSG  });
    }
  }

  createUserToken(user: IUserModel, res: Response) {
    const tokenObj = {
      user_id: user._id,
      email: user.email,
    };
    const token = jwt.sign(tokenObj, CONSTANTS.JWT_SECRET);
    this._userModule.findByIdAndUpdate(user._id, { token }, (error: any, result: any) => {
      if (error) {
       console.log(error);
        return res.send({ status: CONSTANTS.STATUS_ERROR_CODE, message: CONSTANTS.REQUEST_ERROR_MSG });
      }
      user.token = token;
      const jsonData = {
        status: CONSTANTS.STATUS_ERROR_CODE,
        message: CONSTANTS.REQUEST_ERROR_MSG,
        user: _.omit(user, ['password']),
      };
      res.send(jsonData);
    });
  }

  update(req: Request, res: Response): void {
    try {
      const user: IUserModel = req.body;
      this._userModule.update(user._id, user, (error: any, result: any) => {
        if (error) {
            console.log(error);
          return res.send({ status: CONSTANTS.STATUS_ERROR_CODE, message: CONSTANTS.REQUEST_ERROR_MSG });
        }
        const jsonData = {
          status: CONSTANTS.STATUS_SUCCESS_CODE,
          message:CONSTANTS.REQUEST_SUCCESS_MSG,
          result: result
        };
        res.send(jsonData);
      });
    } catch (e) {
        console.log(e);
      res.send({ status: CONSTANTS.STATUS_ERROR_CODE, message: CONSTANTS.REQUEST_ERROR_MSG });
    }
  }

  retrieve(req: Request, res: Response): void {
    try {
      this._userModule.retrieve({}, (error: any, result: IUserModel[]) => {
        if (error) {
          console.log(error);
          return res.send({ status: CONSTANTS.STATUS_ERROR_CODE, message: CONSTANTS.REQUEST_ERROR_MSG });
        }
        const jsonData = {
          status: CONSTANTS.STATUS_SUCCESS_CODE,
          message:CONSTANTS.REQUEST_SUCCESS_MSG,
          users: result,
        };
        res.send(jsonData);
      });
    } catch (e) {
      console.log(e);
      res.send({ status: CONSTANTS.STATUS_ERROR_CODE, message: CONSTANTS.REQUEST_ERROR_MSG });
    }
  }

  delete(req: Request, res: Response): void {
    try {
      const user_id: string = req.body._id;
      this._userModule.delete(user_id, (error: any, result: any) => {
        if (error) {
          console.log(error);
          return res.send({ status: CONSTANTS.STATUS_ERROR_CODE, message: CONSTANTS.REQUEST_ERROR_MSG });
        }
        const jsonData = {
          status: CONSTANTS.STATUS_SUCCESS_CODE,
          message:CONSTANTS.REQUEST_SUCCESS_MSG,
        };
        res.send(jsonData);
      });
    } catch (e) {
      console.log(e);
      res.send({ status: CONSTANTS.STATUS_ERROR_CODE, message: CONSTANTS.REQUEST_ERROR_MSG });
    }
  }

  async signin(req: Request, res: Response) {
    try {
      const email: string = req.body.email;
      const password: string = req.body.password;
      if (email && password) {
        const userMatch = { email, password };
        const jsonData: any = await this.authenticateUser(userMatch);
        res.send(jsonData);
      }
    } catch (e) {
      console.log(e);
      res.send({ status: CONSTANTS.STATUS_ERROR_CODE, message: CONSTANTS.REQUEST_ERROR_MSG });
    }
  }

  authenticateUser(condition: any) {
    return new Promise((resolve, reject) => {
      this._userModule.retrieve(condition, (error: Error, result: IUserModel[]) => {
        if (error) {
          console.log(error);
          resolve({ status: CONSTANTS.STATUS_ERROR_CODE, message: 'CONSTANTS.REQUEST_ERROR_MSG' });
        } 
        if (_.isEmpty(result)) {
          resolve({ status: CONSTANTS.STATUS_ERROR_CODE, message: 'INVALID_LOGIN_DETAIL' });
        }
        const jsonData = {
          status: CONSTANTS.STATUS_SUCCESS_CODE,
          message: 'REQUEST_SUCCESS_MSG',
          user: _.omit(result[0], "password"),
        };
        resolve(jsonData);
      });
    });
    
  }
}
