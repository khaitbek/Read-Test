import { Column, Entity, OneToMany } from 'typeorm';
import { GeneralEntity } from '@utils/base.entity';
import { BookEntity } from '../../book/entities/book.entity';

@Entity('author')
export class AuthorEntity extends GeneralEntity {
  @Column({ type: 'varchar', name: 'name', nullable: false })
  name: string;

  @Column({ type: 'date', name: 'dateOfBirth', nullable: false })
  dateOfBirth: Date;

  @Column({ type: 'date', name: 'dateOfDeath', nullable: true })
  dateOfDeath?: Date;

  @Column({ type: 'text', name: 'description', nullable: false })
  description: string;

  @Column({ type: 'varchar', name: 'image', nullable: true })
  image: string;

  @OneToMany(() => BookEntity, (book) => book.author)
  books: BookEntity[];
}
