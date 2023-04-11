import { Module } from '@nestjs/common';
import { AdminOrderController } from './controller/admin-order.controller';
import { AdminOrderService } from './service/admin-order.service';
import { TypeOrmExModule } from '@dec/typeorm-ex.module';
import { AdminOrderRepository } from './repository/admin-order.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([AdminOrderRepository])],
  controllers: [AdminOrderController],
  providers: [AdminOrderService],
})
export class AdminOrderModule {}
