// auth.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Nombre de usuario para iniciar sesión',
    type: String,
  })
  username: string;
}
