import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class GetEncryptReqDto {
  @ApiProperty({
    default: 'This is data to be encrypted',
    required: true,
    example: 'This is data to be encrypted',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  payload: string;
}
