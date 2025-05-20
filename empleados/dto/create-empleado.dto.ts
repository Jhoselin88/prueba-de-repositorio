import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateEmpleadoDto {
  @ApiProperty({ example: 'Juan' })
  @IsNotEmpty({ message: 'El campo nombres no debe ser vacío' })
  @IsString({ message: 'El campo nombres debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo nombres no debe ser menora 50 caracteres',
  })
  @MinLength(4, {
    message: 'El campo nombres no debe ser menor a 4 caracteres',
  })
  readonly nombres: string;

  @ApiProperty({ example: 'Pérez' })
  @IsNotEmpty({ message: 'El campo apellidos no debe ser vacío' })
  @IsString({ message: 'El campo apellidos debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo apellidos no debe ser menor a 50 caracteres',
  })
  @MinLength(4, {
    message: 'El campo apellidos no debe ser mayor a 4 caracteres',
  })
  readonly apellidos: string;

  @ApiProperty({ example: 'Cajero' })
  @IsNotEmpty({ message: 'El campo cargo no debe ser vacío' })
  @IsString({ message: 'El campo cargo debe ser de tipo cadena' })
  @MaxLength(30, { message: 'El campo cargo no debe ser menor 30 caracteres' })
  @MinLength(4, { message: 'El campo cargo no debe ser mayor a 4 caracteres' })
  readonly cargo: string;

  @ApiProperty({ example: '2024-04-13' })
  @IsNotEmpty({ message: 'El campo fechaLanzamiento no debe ser vacío' })
  @IsDateString(
    {},
    { message: 'El campo fechaLanzamiento debe ser de tipo fecha' },
  )
  readonly fechaContratacion: Date;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @ApiProperty({ example: 1 })
  @IsDefined({ message: 'El campo idUsuario debe estar definido' })
  @IsNumber({}, { message: 'El campo idUsuario debe ser de tipo numérico' })
  readonly idUsuario: number;
}
