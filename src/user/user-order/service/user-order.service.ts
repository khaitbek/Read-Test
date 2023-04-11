import { Injectable } from '@nestjs/common';
import { UserOrderRepository } from '../repository/user-order.repository';
import { NewOrderDto } from '../dto/newOrder.dto';

@Injectable()
export class UserOrderService {
  constructor(private readonly userOrderRepository: UserOrderRepository) {}

  async createOrder(dto: NewOrderDto) {
    return await this.userOrderRepository.createOrder(dto);
  }
}
