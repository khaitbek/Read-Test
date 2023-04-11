import { CustomRepository } from '@dec/typeorm-ex.decorator';
import { OrderEntity } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '@utils/pagination.dto';
import { BaseResponse } from '@utils/base.response';
import { HttpStatus } from '@nestjs/common';
import { getStatusCode } from '@utils/helper';

@CustomRepository(OrderEntity)
export class AdminOrderRepository extends Repository<OrderEntity> {
  async getOrders(
    dto: PaginationDto,
  ): Promise<BaseResponse<{ data: OrderEntity[]; total: number }>> {
    try {
      const [orderEntities, total] = await this.findAndCount({
        ...dto,
      });
      return {
        status: HttpStatus.OK,
        data: { data: orderEntities, total },
        msg: 'OK',
      };
    } catch (err) {
      return { status: getStatusCode(err), data: null, msg: err.message };
    }
  }

  async getOrderById(id: number): Promise<BaseResponse<OrderEntity>> {
    try {
      const orderEntity = await this.findOneBy({ id });

      if (!orderEntity) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          msg: 'The order is not found',
        };
      }

      return { status: HttpStatus.OK, data: orderEntity, msg: 'OK' };
    } catch (err) {
      return { status: getStatusCode(err), data: null, msg: err.message };
    }
  }

  async updateStatusOrder(id: number): Promise<BaseResponse<OrderEntity>> {
    try {
      const orderEntity = await this.findOneBy({ id });

      if (!orderEntity) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          msg: 'The order is not found',
        };
      }

      orderEntity.isActive = !orderEntity.isActive;
      await this.save(orderEntity);

      return { status: HttpStatus.OK, data: orderEntity, msg: 'UPDATED' };
    } catch (err) {
      return { status: getStatusCode(err), data: null, msg: err.message };
    }
  }
}
