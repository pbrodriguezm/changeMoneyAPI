import { ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { ChangeRequestDto, UpdateExchangeRateDto } from 'src/dto/change.dto';

@ApiTags('Auth')
export class AuthSwagger {
  static login(): MethodDecorator {
    return (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) => {
      ApiResponse({ status: 200, description: 'Login successful send token' })(
        target,
        propertyKey,
        descriptor,
      );
      ApiResponse({ status: 401, description: 'Unauthorized' })(
        target,
        propertyKey,
        descriptor,
      );
    };
  }
}

@ApiTags('Change')
export class ChangeSwagger {
  @ApiBody({ type: ChangeRequestDto })
  static change(): MethodDecorator {
    return (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) => {
      ApiResponse({
        status: 200,
        description: 'Cambio calculado exitosamente',
      })(target, propertyKey, descriptor);
      ApiResponse({ status: 400, description: 'Error de datos' })(
        target,
        propertyKey,
        descriptor,
      );
      ApiResponse({ status: 401, description: 'Unauthorized' })(
        target,
        propertyKey,
        descriptor,
      );
    };
  }

  @ApiBody({ type: UpdateExchangeRateDto })
  static update(): MethodDecorator {
    return (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) => {
      ApiResponse({
        status: 200,
        description: 'Cambio calculado exitosamente',
      })(target, propertyKey, descriptor);
      ApiResponse({ status: 400, description: 'Error de datos' })(
        target,
        propertyKey,
        descriptor,
      );
      ApiResponse({ status: 401, description: 'Unauthorized' })(
        target,
        propertyKey,
        descriptor,
      );
    };
  }
  @ApiResponse({ status: 401, description: 'No autorizado' })
  static updateExchangeRate(): void {}
}
