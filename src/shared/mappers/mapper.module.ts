import { Global, Module } from '@nestjs/common';
import { GamesMapper } from 'src/api/games/mapper';
import { IntegrationMapper } from 'src/api/integration/mapper';

@Global()
@Module({
  imports: [],
  providers: [GamesMapper, IntegrationMapper],
  exports: [GamesMapper, IntegrationMapper],
})
export class MappersModule {}
