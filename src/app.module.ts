import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ChangeModule } from './modules/change.module';
import { AuthService } from './services/auth.service';

@Module({
  imports: [AuthModule, ChangeModule, AppModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, AuthService],
})
export class AppModule {}
