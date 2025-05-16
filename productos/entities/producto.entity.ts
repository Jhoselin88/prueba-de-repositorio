import { Categoria } from 'src/categorias/entities/categoria.entity';
import { DetalleVenta } from 'src/ventas/entities/detalle_venta.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50, nullable: false })
  nombre: string;

  @Column('varchar', { length: 200, nullable: false })
  descripcion: string;

  @Column('decimal', { name: 'precio_unitario', precision: 10, scale: 2 })
  precioUnitario: number;

  @Column()
  stock: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  //varios productos pertenecen a Una categoría
  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'id_categoria', referencedColumnName: 'id' })
  categoria: Categoria;

  //un producto puede tener varios ventas de detalle
  @OneToMany(() => DetalleVenta, (ventadetalle) => ventadetalle.producto)
  ventadetalles: DetalleVenta[];
}
