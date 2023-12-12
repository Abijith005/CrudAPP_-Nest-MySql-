import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('ccccccc');
    
    return 'Hello World this is a check this is another check this is another one eeee';
  }
}
