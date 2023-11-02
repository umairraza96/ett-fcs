import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DishesModule } from './dishes/dishes.module';
import { OrdersModule } from './orders/orders.module';
import { ChefsModule } from './chefs/chefs.module';
import { FoodiesModule } from './foodies/foodies.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [DishesModule, OrdersModule, ChefsModule, FoodiesModule, AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
