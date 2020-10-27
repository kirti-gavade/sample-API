import { Request, Response } from 'express';
import { WeatherModel } from './weather.model';
import { CONSTANTS } from '../../config/constants/constants';

export class WeatherController {
  private readonly weatherModel: WeatherModel;

  constructor() {
    this.weatherModel = new WeatherModel();
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const object = this.getJsonObject();
      const date = new Date().getDate();
      await this.sendResponse(date, object, res);
    } catch (e) {
      res.send({ status: CONSTANTS.STATUS_ERROR_CODE, message:'Something went wrong!' });
    }
  }

 private  getJsonObject(){
   return({
    coord: {
        lon: 73.86,
        lat: 18.52
    },
    weather: [
        {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01d"
        }
    ],
    visibility: 10000,
    timezone: 19800,
    id: 1259229,
    name: "Pune",
    cod: 200
  });
 }

 private checkIfDateIsPrime(number:number){
  let isPrime = true;
    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            isPrime = false;
            break;
        }
    }
  return(isPrime);
}

private async sendResponse(date: number, object: any, res: Response){
  if(this.checkIfDateIsPrime(date) === true){
    const result = await this.weatherModel.create(object);
    res.send({ result,
      status:CONSTANTS.STATUS_SUCCESS_CODE, 
      message:'Weather information saved successfully in database',
      });
  } else {
    res.send({status:CONSTANTS.STATUS_SUCCESS_CODE, message:'Current date is not a prime number, no insertion needed'});
  }
}
}
