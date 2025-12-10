import { ApiProperty } from '@nestjs/swagger';

export class GetDecryptResDto {
  @ApiProperty({
    default: 'Decrypted data 1',
    example: 'Decrypted data 1',
  })
  data1: string;

  @ApiProperty({
    default: 'Decrypted data 2',
    example: 'Decrypted data 2',
  })
  data2: string;
}
