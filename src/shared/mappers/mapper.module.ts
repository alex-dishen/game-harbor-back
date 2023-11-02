import { Global, Module } from '@nestjs/common';
import { GamesMapper } from 'src/api/games/mapper';

@Global()
@Module({
  imports: [],
  providers: [GamesMapper],
  exports: [GamesMapper],
})
export class MappersModule {}
