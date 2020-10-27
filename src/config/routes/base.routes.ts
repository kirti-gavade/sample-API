import express from 'express';
import { WeatherRoutes } from '../../app/weather/weather.routes';

const app = express();

export class BaseRoutes {
  get routes() {
    app.use('/', new WeatherRoutes().routes);
    return app;
  }
  
}
