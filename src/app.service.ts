import { Injectable } from '@nestjs/common';
import { AppDto } from './app.dto';

@Injectable()
export class AppService {
  getHello(): AppDto {
    return { phrase: 'Something', planet: 'Pluto' };
  }
}
