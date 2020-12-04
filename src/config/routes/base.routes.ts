import express from 'express';
import { ProductRoutes } from '../../app/product/product.routes';
import {UserRoutes} from '../../app/user/user.routes';

const app = express();

export class BaseRoutes {
  get routes() {
    app.use('/', new UserRoutes().routes);
    app.use('/', new ProductRoutes().routes);
    return app;
  }
  
}
