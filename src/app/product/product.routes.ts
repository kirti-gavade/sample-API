import { Router } from 'express';
import { ProductController } from './product.controller';
import { AuthenticationController } from './../authentication/authentication.controller';

export class ProductRoutes {
  private readonly controller: ProductController;
  private readonly router: Router;
  private _authController: AuthenticationController;

  constructor() {
    this.controller = new ProductController();
    this.router = Router();
    this._authController = new AuthenticationController();

  }

  get routes() {
    this.router.post('/api/product', this._authController.ensureAuthorized,this.controller.create.bind(this.controller));
    this.router.get('/', function (req, res) {
      res.write("<h1>Welcome to sample APP</h1>");
      res.end();
    });
    return this.router;
  }
}

Object.seal(ProductRoutes);
