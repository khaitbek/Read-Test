import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UserEntity } from '@user/user/entities/user.entity';
import { SUPER_ADMIN } from '@utils/constants';
import { bcryptHelper } from '@utils/helper';

@Injectable()
export class SeedService {
  constructor(private readonly entityManager: EntityManager) {}

  async perform(): Promise<void> {
    await this.entityManager.transaction(async (manager) => {
      await this.createSuperAdminUser(manager);

      console.log('Seed data complete.');
    });
  }

  async createSuperAdminUser(manager: EntityManager): Promise<void> {
    const users = await manager.find(UserEntity);

    if (users.length > 0) {
      console.log('SuperAdmin user exists. Skipping seed.');
    } else {
      const user = new UserEntity();
      user.name = SUPER_ADMIN;
      user.isAdmin = true;
      user.password = await bcryptHelper.hash('12345678');

      const superAdminUser = manager.create(UserEntity, user);
      await manager.save(superAdminUser);
    }
  }
}
