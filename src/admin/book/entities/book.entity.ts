import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { GeneralEntity } from '@utils/base.entity';
import { ImageEntity } from './image.entity';
import { AuthorEntity } from '../../author/entities/author.entity';
import { CategoryEntity } from '../../category/entities/category.entity';
import { OrderEntity } from '../../admin-order/entities/order.entity';

@Entity('book')
export class BookEntity extends GeneralEntity {
  @Column({ type: 'varchar', name: 'title', nullable: false, unique: true })
  @Index('title')
  title: string;

  @Column({ type: 'float', name: 'price', nullable: false })
  price: number;

  @Column({ type: 'text', name: 'desc', nullable: false })
  desc: string;

  @Column({ type: 'int', name: 'pages', nullable: false })
  pages: number;

  @Column({ type: 'float', name: 'rating', nullable: false })
  rating: number;

  @Column({ type: 'int', name: 'count', nullable: false })
  count: number;

  @Column({ type: 'int', name: 'year', nullable: false })
  year: number;

  @OneToOne(() => ImageEntity)
  @JoinColumn()
  image: ImageEntity;

  @ManyToOne(() => AuthorEntity, (author) => author.books)
  author: AuthorEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.books)
  category: CategoryEntity;

  @OneToMany(() => OrderEntity, (order) => order.book)
  orders: OrderEntity[];
}
