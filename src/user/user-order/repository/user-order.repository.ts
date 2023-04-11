import { CustomRepository } from '@dec/typeorm-ex.decorator';
import { OrderEntity } from '@admin/admin-order/entities/order.entity';
import { MoreThan, Repository } from 'typeorm';
import { BaseResponse } from '@utils/base.response';
import { getStatusCode } from '@utils/helper';
import { NewOrderDto } from '../dto/newOrder.dto';
import { BookEntity } from '@admin/book/entities/book.entity';
import { HttpStatus } from '@nestjs/common';
import { dataSource } from '@utils/dataSource';

@CustomRepository(OrderEntity)
export class UserOrderRepository extends Repository<OrderEntity> {
  async createOrder(dto: NewOrderDto): Promise<BaseResponse<OrderEntity>> {
    const queryRunner = dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const bookEntity = await BookEntity.findOne({
        where: { id: dto.bookId, count: MoreThan(0) },
      });
      if (!bookEntity) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          msg: 'The relative book is not found or no book left',
        };
      }

      bookEntity.count -= 1;
      await queryRunner.manager.save(BookEntity, bookEntity);

      const orderEntity = await queryRunner.manager.save(OrderEntity, {
        book: { id: bookEntity.id },
        name: dto.name,
        isActive: dto.isActive,
        email: dto.email,
        phone: dto.phone,
        location: dto.location,
      });

      await queryRunner.commitTransaction();

      return { status: HttpStatus.CREATED, data: orderEntity, msg: 'CREATED' };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return { status: getStatusCode(err), data: null, msg: err.message };
    } finally {
      await queryRunner.release();
    }
  }
}
