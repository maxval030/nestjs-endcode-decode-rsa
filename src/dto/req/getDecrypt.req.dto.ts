import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class GetDecryptReqDto {
  @ApiProperty({
    default: 'Encrypted data 1',
    required: true,
    example: 'Encrypted data 1',
  })
  @IsString()
  @IsNotEmpty()
  data1: string;

  @ApiProperty({
    default: 'Encrypted data 2',
    required: true,
    example: 'Encrypted data 2',
  })
  @IsString()
  @IsNotEmpty()
  data2: string;
}
