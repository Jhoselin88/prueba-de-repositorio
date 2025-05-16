import { Producto } from '../../productos/entities/producto.entity';
import { Venta } from './venta.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('detalle_ventas')
export class DetalleVenta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  cantidad: number;

  @Column({ name: 'precio_unitario', type: 'numeric', precision: 10, scale: 2 })
  precioUnitario: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  subtotal: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  //varios ventaDetalle pueden tener una venta (M a 1)
  @ManyToOne(() => Venta, (venta) => venta.ventadetalles)
  @JoinColumn({ name: 'id_venta', referencedColumnName: 'id' })
  venta: Venta;

  //idProducto
  //varios detalleventa puede estar a un producto
  @ManyToOne(() => Producto, (producto) => producto.ventadetalles)
  @JoinColumn({ name: 'id_producto', referencedColumnName: 'id' })
  producto: Producto;
}
