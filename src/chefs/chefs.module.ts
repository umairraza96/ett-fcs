import { Module } from '@nestjs/common';
import { ChefsService } from './chefs.service';
import { ChefsController } from './chefs.controller';

@Module({
  controllers: [ChefsController],
  providers: [ChefsService],
})
export class ChefsModule {}
