import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@user/user/repository/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'ea6f2e11ea6f2e',
    });
  }

  async validate(payload: { name: string; isAdmin: boolean }) {
    try {
      const user = await this.userRepository.getUserByName(payload.name);
      delete user.password;
      return user;
    } catch (err) {
      throw new RequestTimeoutException({
        status: 408,
        message:
          'Timed out fetching a new connection from the connection pool!',
        error: true,
      });
    }
  }
}
