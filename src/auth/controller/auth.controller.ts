import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/login.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthResponseSwagger } from '@utils/swagger-response/auth.response.swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ description: 'Successfully logged in' })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  @ApiInternalServerErrorResponse({
    description: 'Unknown server error',
    type: AuthResponseSwagger,
  })
  @ApiBody({ type: LoginDto })
  @HttpCode(200)
  @Post('/login')
  async login(@Body() dto: LoginDto, @Res() response: Response) {
    const res = await this.authService.login(dto);
    response.status(res.status).json(res);
  }
}
