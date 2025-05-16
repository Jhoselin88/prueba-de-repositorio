import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { Venta } from './entities/venta.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Ventas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de todas las ventas' })
  async obtenerVentas() {
    return this.ventasService.obtenerVentas();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Detalle de una venta específica' })
  @ApiResponse({ status: 404, description: 'Venta no encontrada' })
  async obtenerVentaPorId(@Param('id') id: number): Promise<Venta> {
    return this.ventasService.obtenerVentaPorId(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Venta creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o error de stock' })
  async crearVenta(@Body() createVentaDto: CreateVentaDto): Promise<Venta> {
    return this.ventasService.crearVenta(createVentaDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Venta anulada exitosamente' })
  @ApiResponse({ status: 404, description: 'Venta no encontrada' })
  @ApiResponse({ status: 400, description: 'La venta ya está anulada' })
  @ApiResponse({ status: 500, description: 'Error al anular la venta' })
  async anularVentaPorId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Venta> {
    return this.ventasService.anularVenta(id);
  }

  @Delete()
  @ApiResponse({
    status: 200,
    description: 'Ventas anuladas eliminadas exitosamente',
  })
  @ApiResponse({ status: 500, description: 'Error al limpiar ventas anuladas' })
  async limpiarAnuladas(): Promise<{ cantidadRegistrosEliminados: number }> {
    return this.ventasService.limpiarVentasAnuladas();
  }
}
