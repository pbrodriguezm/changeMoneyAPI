import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangeRateService } from './change-rate.service';

@Injectable()
export class ChangeService {
  constructor(
    private readonly authService: AuthService,
    private readonly changeRateService: ChangeRateService,
  ) {}

  async changeMoney(
    monto: number,
    monedaOrigen: string,
    monedaDestino: string,
  ): Promise<any> {
    if (!monto) {
      throw new BadRequestException('Falta el monto en la solicitud');
    }
    if (
      !this.changeRateService.isCurrencySupported(monedaOrigen) ||
      !this.changeRateService.isCurrencySupported(monedaDestino)
    ) {
      throw new BadRequestException('Moneda no admitida');
    }

    const tasaOrigen = this.changeRateService.getExchangeRate(monedaOrigen);
    const tasaDestino = this.changeRateService.getExchangeRate(monedaDestino);

    const montoConCambio = (monto / tasaOrigen) * tasaDestino;

    return {
      status: 'Data Success',
      monto,
      montoConCambio,
      monedaOrigen,
      monedaDestino,
      tipoCambio: tasaDestino / tasaOrigen,
    };
  }

  updateExchangeRate(currency: string, newRate: number): boolean {
    if (!currency || !newRate) {
      throw new BadRequestException('Tipo de monera y monto son obligatorios');
    }
    return this.changeRateService.updateExchangeRate(currency, newRate);
  }
}
