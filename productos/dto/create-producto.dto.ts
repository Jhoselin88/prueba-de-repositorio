import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductoDto {
  @ApiProperty({
    example: 'Hamburguesa Clásica',
  })
  @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo nombre no debe ser menor a 50 caracteres',
  })
  @MinLength(2, { message: 'El campo nombre no debe ser mayor a 2 caracteres' })
  readonly nombre: string;

  @ApiProperty({
    example: 'Hamburguesa con carne de res, lechuga, tomate y queso cheddar.',
  })
  @IsNotEmpty({ message: 'el campo descripcion no debe ser vacio' })
  @IsString({ message: 'El campo descricion debe ser de tipo cadena' })
  @MaxLength(200, {
    message: 'el campo descripcion debe ser menor a 200 caracteres',
  })
  @MinLength(2, {
    message: 'El campo descripcion debe ser mayor a 10 caracteres',
  })
  readonly descripcion: string;

  @ApiProperty({
    example: 25.5,
    description: 'Precio unitario del producto, puede tener decimales',
    type: 'number',
    format: 'decimal',
  })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 },
    { message: 'El campo precio unitario debe ser de tipo numérico y puede tener hasta 2 decimales' },
  )
  readonly precioUnitario: number;

  @ApiProperty({
    example: 100,
  })
  @IsNumber({}, { message: 'El campo stock debe ser de tipo numérico' })
  readonly stock: number;

  @ApiProperty({
    example: 1,
  })
  @IsDefined({ message: 'El campo idCategoria debe estar definido' })
  @IsNumber({}, { message: 'El campo idCategoria debe ser de tipo numérico' })
  readonly idCategoria: number;
}
