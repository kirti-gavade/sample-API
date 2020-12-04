import { Request, Response } from 'express';
import { ProductModel } from './product.model';
import {IModel} from './product.model.interface';
import { CONSTANTS } from '../../config/constants/constants';

export class ProductController {
  private readonly productModel: ProductModel;

  constructor() {
    this.productModel = new ProductModel();
  }

  create(req: Request, res: Response): void {
    try {
      const product: IModel = req.body;
      this.productModel.create(product, (error: any, userResult: IModel) => {
        if (error) {
          console.log(error);
          return res.send({ status: CONSTANTS.STATUS_ERROR_CODE, message: CONSTANTS.REQUEST_ERROR_MSG  });
        }
        const jsonData = {
            status: CONSTANTS.STATUS_SUCCESS_CODE,
            message:CONSTANTS.REQUEST_SUCCESS_MSG,
            result: userResult
          };
          res.send(jsonData);
      });
      
    } catch (e) {
     console.log(e);
      res.send({ status: CONSTANTS.STATUS_ERROR_CODE, message: CONSTANTS.REQUEST_ERROR_MSG  });
    }
  }


  
}
