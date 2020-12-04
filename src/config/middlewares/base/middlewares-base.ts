import express from 'express';
import bodyParser from 'body-parser';

import { BaseRoutes } from './../../routes/base.routes';

export class MiddlewaresBase {
  static get configuration() {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true,
    }));
    app.use(new BaseRoutes().routes);

    return app;
  }
}
