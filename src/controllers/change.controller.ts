import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ChangeService } from 'src/services/change.service';

@Controller('change')
export class ChangeController {
  constructor(private readonly changeService: ChangeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async calculateChange(@Body() changeRequest: any): Promise<any> {
    const { monto, monedaOrigen, monedaDestino } = changeRequest;
    return this.changeService.changeMoney(monto, monedaOrigen, monedaDestino);
  }
  @Post('/update-exchange-rate')
  async updateExchangeRate(@Body() updateRequest: any): Promise<any> {
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
