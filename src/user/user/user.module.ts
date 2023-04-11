import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmExModule } from '@dec/typeorm-ex.module';
import { UserRepository } from './repository/user.repository';
import { UserOrderModule } from '../user-order/user-order.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository]),
    UserOrderModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
