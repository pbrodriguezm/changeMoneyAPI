import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface CurrencyRate {
  currency: string;
  rate: number;
}

interface User {
  id: string;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private readonly exchangeRates: CurrencyRate[] = [
    { currency: 'PEN', rate: 3.8 },
    { currency: 'USD', rate: 1.0 },
    { currency: 'EUR', rate: 0.85 },
    { currency: 'GBP', rate: 0.75 },
  ];

  private readonly users: User[] = [
    { id: '1', username: 'admin' },
    { id: '2', username: 'admin2' },
  ];

  async validateUser(userName: string): Promise<User | null> {
    const user = this.users.find((u) => u.username === userName);
    return user || null;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
  ): Promise<number> {
    const fromRate = this.getExchangeRate(fromCurrency);
    const toRate = this.getExchangeRate(toCurrency);

    if (fromRate === null || toRate === null) {
      throw new Error('Moneda no admitida');
    }

    // Realiza la conversión de moneda
    const convertedAmount = (amount / fromRate) * toRate;
    return convertedAmount;
  }

  getExchangeRate(currency: string): number | null {
    const rateEntry = this.exchangeRates.find(
      (entry) => entry.currency === currency,
    );
    return rateEntry ? rateEntry.rate : null;
  }
}
