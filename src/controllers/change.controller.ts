import {
  Controller,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ChangeService } from 'src/services/change.service';
import { ChangeSwagger } from './swagger.controller';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { ChangeRequestDto, UpdateExchangeRateDto } from 'src/dto/change.dto';

@Controller('change')
export class ChangeController {
  constructor(private readonly changeService: ChangeService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ChangeSwagger.change()
  @ApiBody({
    description:
      'Valores obligatorios PRUEBA("monedaOrigen": "USD") por ahora solo origen USD, para realizar el tipo de cambio moneda (PEN, USD, EUR), \n ** Recuerde agregar el Token en el candado plomo de la barra de este endpoint',
    type: ChangeRequestDto,
  })
  async calculateChange(@Body() changeRequest: any): Promise<any> {
    const { monto, monedaOrigen, monedaDestino } = changeRequest;
    return this.changeService.changeMoney(monto, monedaOrigen, monedaDestino);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/update-exchange-rate')
  @ChangeSwagger.update()
  @ApiBody({
    description:
      'Actualización de tipo de cambio de USD a Moneda (currency).  ** Recuerde agregar el Token en el candado plomo de la barra de este endpoint',
    type: UpdateExchangeRateDto,
  })
  async updateExchangeRate(@Body() updateRequest: any): Promise<any> {
    if (!updateRequest || !updateRequest?.currency || !updateRequest?.newRate) {
      throw new UnauthorizedException(
        'currency y newRate son campos obligatorios',
      );
    }
    const { currency, newRate } = updateRequest;
    const updated = this.changeService.updateExchangeRate(currency, newRate);

    if (updated) {
      return {
        status: 'Success',
        message: `Tasa de cambio para ${currency} actualizada correctamente.`,
      };
    } else {
      return {
        status: 'Error',
        message: `La moneda ${currency} no existe o no es admitida.`,
      };
    }
  }
}
