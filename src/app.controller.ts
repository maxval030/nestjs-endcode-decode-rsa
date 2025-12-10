import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GetEncryptReqDto } from './dto/req/getEncrypt.req.dto';
import { GetEncryptResDto } from './dto/res/getEncrypt.res.dto';
import { GetDecryptReqDto } from './dto/req/getDecrypt.req.dto';
import { GetDecryptResDto } from './dto/res/getDecrypt.res.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('get-encrypt-data')
  getEncrypt(@Body() body: GetEncryptReqDto): GetEncryptResDto {
    return this.appService.getEncrypt(body);
  }

  @Post('get-decrypt-data')
  getDecrypt(@Body() body: GetDecryptReqDto): GetDecryptResDto {
    return this.appService.getDecrypt(body);
  }
}
