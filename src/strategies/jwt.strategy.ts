import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth.service';

interface User {
  id: string;
  username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'cod3',
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.authService.validateUser(payload.username);

    if (!user) {
      throw new UnauthorizedException('Usuario no autorizado');
    }

    return user;
  }
}
