import { Module } from '@nestjs/common';

import { ChangeController } from 'src/controllers/change.controller';
import { ChangeService } from 'src/services/change.service';
import { ChangeRateService } from '../services/change-rate.service';
import { AuthService } from 'src/services/auth.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ChangeController],
  providers: [ChangeService, ChangeRateService, AuthService],
})
export class ChangeModule {}
