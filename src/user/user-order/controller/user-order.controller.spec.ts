import { Test, TestingModule } from '@nestjs/testing';
import { UserOrderController } from './user-order.controller';

describe('UserOrderController', () => {
  let controller: UserOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserOrderController],
    }).compile();

    controller = module.get<UserOrderController>(UserOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
