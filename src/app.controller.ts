import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GetEncryptReqDto } from './dto/req/getEncrypt.req.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('get-encrypt-data')
  getEncrypt(@Body() body: GetEncryptReqDto): string {
    return this.appService.getEncrypt();
  }
}
