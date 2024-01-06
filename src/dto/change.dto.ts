// change.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class ChangeRequestDto {
  @ApiProperty({
    description: 'Monto a convertir',
    type: Number,
  })
  monto: number;

  @ApiProperty({
    description: 'Moneda de origen',
    type: String,
  })
  monedaOrigen: string;

  @ApiProperty({
    description: 'Moneda de destino',
    type: String,
  })
  monedaDestino: string;
}

export class UpdateExchangeRateDto {
  @ApiProperty({
    description: 'Moneda para actualizar la tasa de cambio',
    type: String,
  })
  currency: string;

  @ApiProperty({
    description: 'Nueva tasa de cambio',
    type: Number,
  })
  newRate: number;
}
