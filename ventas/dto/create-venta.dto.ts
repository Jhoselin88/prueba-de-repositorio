import { IsNotEmpty, IsNumber, IsString, IsArray, ValidateNested, IsOptional, Min, Max, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class DetalleVentaDto {
  @ApiProperty({ description: 'ID del producto', example: 1 })
  @IsNotEmpty({ message: 'El ID del producto es requerido' })
  @IsNumber({}, { message: 'El ID del producto debe ser un número' })
  idProducto: number;

  @ApiProperty({ description: 'Cantidad del producto', example: 2 })
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'La cantidad debe ser un número entero válido' })
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  @Max(1000000, { message: 'Cantidad demasiado grande' })
  cantidad: number;
}

export class CreateVentaDto {
  @ApiProperty({ description: 'ID del cliente asociado a la venta', example: 1, nullable: true })
  @IsNumber({}, { message: 'El ID del cliente debe ser un número' })
  @IsOptional()
  idCliente?: number;

  @ApiProperty({ description: 'ID del empleado que realiza la venta', example: 1 })
  @IsNumber({}, { message: 'El ID del empleado debe ser un número' })
  @IsNotEmpty({ message: 'El ID del empleado es requerido' })
  idEmpleado: number;

  @ApiProperty({
    description: 'Método de pago utilizado',
    example: 'efectivo',
    enum: ['efectivo', 'tarjeta', 'transferencia', 'cotización', 'otro'],
    default: 'efectivo',
  })
  @IsString({ message: 'El método de pago debe ser una cadena de texto' })
  @IsEnum(['efectivo', 'tarjeta', 'transferencia', 'cotización', 'otro'], { 
    message: 'Método de pago inválido. Debe ser: efectivo, tarjeta, transferencia, cotización o otro' 
  })
  metodoPago: string;

  @ApiProperty({
    description: 'Detalles de los productos vendidos',
    type: [DetalleVentaDto],
  })
  @IsArray({ message: 'Los detalles deben ser un arreglo' })
  @ValidateNested({ each: true })
  @Type(() => DetalleVentaDto)
  detalles: DetalleVentaDto[];

  @ApiProperty({ 
    description: 'Tipo de documento', 
    example: 'VEN', 
    enum: ['VEN', 'FAC'],
    required: false 
  })
  @IsString({ message: 'El tipo de documento debe ser una cadena de texto' })
  @IsOptional()
  tipoDocumento?: string;
}