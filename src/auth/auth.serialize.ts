import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

interface ClassConstructor {
  new (...args: any[]): any;
}

export function AuthSerialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
