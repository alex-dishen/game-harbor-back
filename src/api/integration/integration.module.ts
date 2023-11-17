import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { Producer } from 'src/api/integration/integration.producer';
import { Consumer } from 'src/api/integration/integration.consumer';
import { IntegrationController } from 'src/api/integration/integration.controller';
import { QUEUE } from 'src/api/integration/constants';

@Module({
  imports: [
    BullModule.forRoot({
      redis: { host: 'localhost', port: 6379 },
    }),
    BullModule.registerQueue({ name: QUEUE.Integration }),
  ],
  controllers: [IntegrationController],
  providers: [Producer, Consumer],
})
export class IntegrationModule {}
