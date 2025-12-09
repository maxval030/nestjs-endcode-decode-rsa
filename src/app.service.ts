import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getEncrypt(): string {
    return 'This is encrypted data';
  }
}
