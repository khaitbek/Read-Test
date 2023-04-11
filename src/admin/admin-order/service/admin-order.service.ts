import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminOrderRepository } from '../repository/admin-order.repository';
import { PaginationDto } from '@utils/pagination.dto';

@Injectable()
export class AdminOrderService {
  constructor(
    @InjectRepository(AdminOrderRepository)
    private adminOrderRepository: AdminOrderRepository,
  ) {}

  async getOrders(dto: PaginationDto) {
    return await this.adminOrderRepository.getOrders(dto);
  }

  async getOrderById(id: number) {
    return await this.adminOrderRepository.getOrderById(id);
  }

  async updateOrder(id: number) {
    return await this.adminOrderRepository.updateStatusOrder(id);
  }
}
