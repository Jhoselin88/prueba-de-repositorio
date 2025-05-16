import { Cliente } from '../../clientes/entities/cliente.entity';
import { DetalleVenta } from './detalle_venta.entity';
import { Empleado } from 'src/empleados/entities/empleado.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('ventas')
export class Venta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'total_venta', type: 'numeric', precision: 10, scale: 2 })
  totalVenta: number;

  @Column({
    name: 'metodo_pago',
    type: 'varchar',
    length: 50,
    default: 'efectivo',
    enum: ['efectivo', 'tarjeta', 'transferencia', 'cotización', 'otro'],
  })
  metodoPago: string;


  @Column({
    type: 'varchar',
    length: 20,
    default: 'realizada',
    comment: 'Estado de la venta: realizada o anulada',
  })
  estado: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  //  muchas ventas puede realizar  un cliente
  @ManyToOne(() => Cliente, (cliente) => cliente.ventas)
  @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id' })
  cliente: Cliente;

  @ManyToOne(() => Empleado, (empleado) => empleado.ventas)
  @JoinColumn({ name: 'id_empleado', referencedColumnName: 'id' })
  empleado: Empleado;

  @OneToMany(() => DetalleVenta, (detalleVenta) => detalleVenta.venta, {
    cascade: true,
  })
  ventadetalles: DetalleVenta[];
}
