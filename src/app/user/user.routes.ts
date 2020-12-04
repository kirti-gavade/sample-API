import { Router } from 'express';
import path from 'path';
import { UserController } from './user.controller';
import { AuthenticationController } from './../authentication/authentication.controller';

export class UserRoutes {
  private _userController: UserController;
  private _router: Router;
  private _authController: AuthenticationController;


  constructor() {
    this._userController = new UserController();
    this._router = Router();
    this._authController = new AuthenticationController();
  }

  get routes() {
    const router = this._router;
    const controller = this._userController;
    router.post('/api/user', controller.create.bind(controller));
    router.put('/api/user', this._authController.ensureAuthorized, controller.update.bind(controller));
    router.delete('/api/user',this._authController.ensureAuthorized, controller.delete.bind(controller));
    router.post('/api/user/all', controller.retrieve.bind(controller));
    router.post('/api/user/signin', controller.signin.bind(controller));

    router.get('/', function (req, res) {
      res.render('../dist/views/index.html', {
          title: 'TVS EMS API'
      });
    });

    router.get('/logs', function (req, res) {
      res.sendFile(path.join(__dirname, '../../../api_logs/combined.log'));
    });
    
    router.get('/exceptions', function (req, res) {
      res.sendFile(path.join(__dirname, '../../../api_logs/exceptions.log'));
    });

    return router;
  }
}

Object.seal(UserRoutes);
