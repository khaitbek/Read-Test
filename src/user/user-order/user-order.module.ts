import { Module } from '@nestjs/common';
import { UserOrderController } from './controller/user-order.controller';
import { UserOrderService } from './service/user-order.service';
import { TypeOrmExModule } from '@dec/typeorm-ex.module';
import { UserOrderRepository } from './repository/user-order.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserOrderRepository])],
  controllers: [UserOrderController],
  providers: [UserOrderService],
})
export class UserOrderModule {}
