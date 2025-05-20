import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({
    example: 'Juan',
    description: 'Nombres del cliente',
  })
  @IsNotEmpty({ message: 'El campo nombres no debe ser vacío' })
  @IsString({ message: 'El campo nombres debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo nombres no debe ser nemor a 50 caracteres',
  })
  @MinLength(3, { message: 'El campo nombres  debe ser mayor a 3 caracteres' })
  readonly nombres: string;

  @ApiProperty({
    example: 'Pérez García',
    description: 'Apellidos del cliente',
  })
  @IsNotEmpty({ message: 'El campo apellidos no debe ser vacío' })
  @IsString({ message: 'El campo apellidos debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo apellidos no debe ser nemor a 50 caracteres',
  })
  @MinLength(4, {
    message: 'El campo apellidos  debe ser mayor a 4 caracteres',
  })
  readonly apellidos: string;

  @ApiProperty({
    example: 'Av. Siempre Viva 123',
    description: 'Dirección del cliente',
  })
  @IsNotEmpty({ message: 'El campo direccion no debe ser vacío' })
  @IsString({ message: 'El campo direccion debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo direccion no debe ser nemor a 30 caracteres',
  })
  @MinLength(4, {
    message: 'El campo direccion  debe ser mayor a 4 caracteres',
  })
  readonly direccion: string;

  @ApiProperty({
    example: '71234567',
    description: 'Teléfono del cliente',
  })
  @IsNotEmpty({ message: 'El campo telefono no debe ser vacío' })
  @IsString({ message: 'El campo telefono debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo telefono no debe ser nemor a 8 caracteres',
  })
  @MinLength(4, { message: 'El campo telefono  debe ser mayor a 4 caracteres' })
  readonly telefono: string;

  @ApiProperty({
    example: 'juan.perez@email.com',
    description: 'Correo electrónico del cliente',
  })
  @IsNotEmpty({ message: 'El campo email no debe ser vacío' })
  @IsString({ message: 'El campo email debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo email no debe ser nemor a 50 caracteres',
  })
  @MinLength(4, { message: 'El campo email  debe ser mayor a 4 caracteres' })
  readonly email: string;
}
