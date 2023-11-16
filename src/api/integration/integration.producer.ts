import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { QUEUE } from './constants';

@Injectable()
export class Producer {
  constructor(@InjectQueue(QUEUE.Integration) private queue: Queue) {}
  // onModuleInit() {
  //   throw new Error('Method not implemented.');
  // }

  // async onModuleInit() {
  //   await this.queue.add(
  //     { name: 'msg' },
  //     { repeat: { cron: '*/10 * * * * *' } },
  //   );
  // }
}
