import { Column, Entity } from 'typeorm';
import { GeneralEntity } from '@utils/base.entity';

@Entity('image')
export class ImageEntity extends GeneralEntity {
  @Column({ type: 'varchar', name: 'img', nullable: false })
  img: string;
}
