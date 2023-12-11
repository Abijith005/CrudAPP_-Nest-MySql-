import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getToken')
  getHello(): string {
    console.log('get token here');
    
    return this.appService.getHello();
  }
}
