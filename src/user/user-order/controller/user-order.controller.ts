import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserOrderService } from '../service/user-order.service';
import { NewOrderDto } from '../dto/newOrder.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('user')
@Controller('user-order')
export class UserOrderController {
  constructor(private readonly userOrderService: UserOrderService) {}

  @ApiCreatedResponse({ description: 'New order' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Unknown server error' })
  @Post()
  async createOrder(@Body() dto: NewOrderDto, @Res() res: Response) {
    const response = await this.userOrderService.createOrder(dto);
    res.status(response.status).json(response);
  }
}
