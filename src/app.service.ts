import { Injectable } from '@nestjs/common';
import { GetEncryptReqDto } from './dto/req/getEncrypt.req.dto';
import * as crypto from 'crypto';
import { GetDecryptReqDto } from './dto/req/getDecrypt.req.dto';
import { GetEncryptResDto } from './dto/res/getEncrypt.res.dto';
@Injectable()
export class AppService {
  private readonly rsaPrivateKey: string = process.env.PRIVATE_KEY || '';
  private readonly rsaPublicKey: string = process.env.PUBLIC_KEY || '';

  public getEncrypt(command: GetEncryptReqDto): {
    data1: string;
    data2: string;
  } {
    const randomAESKey = crypto.randomBytes(16).toString('hex');
    // encrypt randomAESKey with RSA public key

    const data1 = this.encryptRSA(randomAESKey);
    // encrypt payload with AES using randomAESKey
    const data2 = this.encryptAES(command.payload, randomAESKey);

    return {
      data1,
      data2,
    };
  }

  public getDecrypt(command: GetDecryptReqDto): GetEncryptResDto {
    const { data1, data2 } = command;
    const decryptedAESKey = this.decryptRSA(data1);
    const decryptedPayload = this.decryptAES(data2, decryptedAESKey);

    return {
      data1: decryptedAESKey,
      data2: decryptedPayload,
    };
  }

  private encryptRSA(text: string): string {
    const encryptRsaData = crypto
      .privateEncrypt(this.rsaPrivateKey, Buffer.from(text))
      .toString('base64');

    return encryptRsaData;
  }

  private encryptAES(text: string, aesKey: string): string {
    const key = aesKey;
    if (!key) {
      throw new Error('Encryption key must be set in environment variables');
    }

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  }

  private decryptRSA(encryptedText: string): string {
    const decryptRsaData = crypto
      .publicDecrypt(this.rsaPublicKey, Buffer.from(encryptedText, 'base64'))
      .toString('utf8');

    return decryptRsaData;
  }

  private decryptAES(encryptedText: string, aesKey: string): string {
    const key = aesKey;
    if (!key) {
      throw new Error('Decryption key must be set in environment variables');
    }

    const parts = encryptedText.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encryptedTextBuffer = parts[1];
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(key),
      iv,
    );
    let decrypted = decipher.update(encryptedTextBuffer, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
