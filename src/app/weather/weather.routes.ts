import { Router } from 'express';
import { WeatherController } from './weather.controller';

export class WeatherRoutes {
  private readonly controller: WeatherController;
  private readonly router: Router;

  constructor() {
    this.controller = new WeatherController();
    this.router = Router();
  }

  get routes() {
    this.router.post('/api/create', this.controller.create.bind(this.controller));
   
    this.router.get('/', function (req, res) {
      res.write("<h1>Welcome to sample APP</h1>");
      res.end();
    });
    return this.router;
  }
}

Object.seal(WeatherRoutes);
