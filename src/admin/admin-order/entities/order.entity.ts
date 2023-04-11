import { Column, Entity, ManyToOne } from 'typeorm';
import { GeneralEntity } from '@utils/base.entity';
import { BookEntity } from '../../book/entities/book.entity';

@Entity('orders')
export class OrderEntity extends GeneralEntity {
  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'email', type: 'varchar', nullable: false })
  email: string;

  @Column({ name: 'phone', type: 'varchar', nullable: false })
  phone: string;

  @Column({ name: 'location', type: 'varchar', nullable: true })
  location?: string;

  @Column({ name: 'isActive', type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => BookEntity, (book) => book.orders)
  book: BookEntity;
}
