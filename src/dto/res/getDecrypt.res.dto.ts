import { ApiProperty } from '@nestjs/swagger';

export class GetEncryptResDto {
  @ApiProperty({
    default: 'Encrypted data 1',
    example: 'Encrypted data 1',
  })
  data1: string;

  @ApiProperty({
    default: 'Encrypted data 2',
    example: 'Encrypted data 2',
  })
  data2: string;
}
