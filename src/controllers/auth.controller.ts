import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { AuthSwagger } from './swagger.controller';
import { ApiBody } from '@nestjs/swagger';
import { LoginDto } from 'src/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @AuthSwagger.login()
  @ApiBody({
    description: 'Credenciales de inicio de sesión para test (admin)',
    type: LoginDto,
  })
  async login(
    @Body() credentials: { username: string },
  ): Promise<{ accessToken: string }> {
    if (!credentials?.username) {
      throw new UnauthorizedException('El campo *username* es obligatorio');
    }
    const user = await this.authService.validateUser(credentials.username);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return this.authService.login(user);
  }
}
