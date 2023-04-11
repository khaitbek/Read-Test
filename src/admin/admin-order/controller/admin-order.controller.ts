import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AdminOrderService } from '../service/admin-order.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '@auth/guard/jwt.guard';
import { PaginationDto } from '@utils/pagination.dto';

@ApiTags('AdminOrder')
@Controller('admin-order')
export class AdminOrderController {
  constructor(private readonly adminOrderService: AdminOrderService) {}

  @ApiOkResponse({ description: 'Orders' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiInternalServerErrorResponse({ description: 'Unknown server error' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'skip', type: Number, required: false })
  @ApiQuery({ name: 'take', type: Number, required: false })
  @UseGuards(JwtGuard)
  @Get()
  async getOrders(@Query() query: PaginationDto, @Res() res: Response) {
    const response = await this.adminOrderService.getOrders(query);
    res.status(response.status).json(response);
  }

  @ApiOkResponse({ description: 'Order' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Unknown server error' })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'order id',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(':id')
  async getOrderById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const response = await this.adminOrderService.getOrderById(id);
    res.status(response.status).json(response);
  }

  @ApiOkResponse({ description: 'Order' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Unknown server error' })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'order id',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const response = await this.adminOrderService.updateOrder(id);
    res.status(response.status).json(response);
  }
}
