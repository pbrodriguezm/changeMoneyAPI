import { Injectable } from '@nestjs/common';

interface CurrencyRate {
  currency: string;
  rate: number;
}

@Injectable()
export class ChangeRateService {
  private readonly exchangeRates: CurrencyRate[] = [
    { currency: 'PEN', rate: 3.85 },
    { currency: 'USD', rate: 1.0 },
    { currency: 'EUR', rate: 0.85 },
    { currency: 'GBP', rate: 0.75 },
  ];

  private readonly supportedCurrencies: string[] = ['PEN', 'USD', 'EUR', 'GBP'];

  isCurrencySupported(currency: string): boolean {
    return this.exchangeRates.some((rate) => rate.currency === currency);
  }

  getExchangeRate(currency: string): number | null {
    const rateEntry = this.exchangeRates.find(
      (entry) => entry.currency === currency,
    );
    return rateEntry ? rateEntry.rate : null;
  }
}
