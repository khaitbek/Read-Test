import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { GeneralEntity } from '@utils/base.entity';

@Entity('users')
export class UserEntity extends GeneralEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'name', nullable: false })
  name: string;

  @Column({ type: 'varchar', name: 'password', nullable: false })
  password: string;

  @Column({ type: 'boolean', name: 'isAdmin', default: false })
  isAdmin: boolean;
}
