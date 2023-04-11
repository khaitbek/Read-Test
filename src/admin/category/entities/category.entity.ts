import { Column, Entity, OneToMany } from 'typeorm';
import { GeneralEntity } from '@utils/base.entity';
import { BookEntity } from '../../book/entities/book.entity';

@Entity('category')
export class CategoryEntity extends GeneralEntity {
  @Column({ type: 'varchar', name: 'name', nullable: false, unique: true })
  name: string;

  @OneToMany(() => BookEntity, (book) => book.category)
  books: BookEntity[];
}
