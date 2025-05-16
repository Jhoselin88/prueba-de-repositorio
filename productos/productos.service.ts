import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const existing = await this.productosRepository.findOne({
      where: { nombre: createProductoDto.nombre.trim() },
    });
    if (existing) {
      throw new ConflictException('Ya existe un producto con ese nombre');
    }

    // Verificar que la categoría exista
    const categoriaRepo =
      this.productosRepository.manager.getRepository(Categoria);
    const categoria = await categoriaRepo.findOne({
      where: { id: createProductoDto.idCategoria },
    });
    if (!categoria) {
      throw new NotFoundException(
        `La categoría con el id ${createProductoDto.idCategoria} no existe`,
      );
    }

    const producto = this.productosRepository.create({
      nombre: createProductoDto.nombre.trim(),
      descripcion: createProductoDto.descripcion.trim(),
      precioUnitario: createProductoDto.precioUnitario,
      stock: createProductoDto.stock,
      categoria: { id: createProductoDto.idCategoria } as Categoria,
    });
    return this.productosRepository.save(producto);
  }

  async findAll(): Promise<Producto[]> {
    return this.productosRepository.find({ relations: ['categoria'] });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productosRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!producto) {
      throw new NotFoundException(`El producto con el id ${id} no existe`);
    }
    return producto;
  }

  async findByCategoria(categoriaId: number): Promise<Producto[]> {
    return this.productosRepository.find({
      where: { categoria: { id: categoriaId } },
      relations: ['categoria'],
    });
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto> {
    const producto = await this.findOne(id);
    if (!producto) {
      throw new NotFoundException(`El producto con el id ${id} no existe`);
    }

    // Validar que el nombre sea único (ignorando el producto actual)
    if (updateProductoDto.nombre) {
      const existing = await this.productosRepository.findOne({
        where: { nombre: updateProductoDto.nombre.trim() },
      });
      if (existing && existing.id !== id) {
        throw new ConflictException('Ya existe un producto con ese nombre');
      }
    }

    // Verificar que la categoría exista si se está actualizando
    if (updateProductoDto.idCategoria) {
      const categoriaRepo =
        this.productosRepository.manager.getRepository(Categoria);
      const categoria = await categoriaRepo.findOne({
        where: { id: updateProductoDto.idCategoria },
      });
      if (!categoria) {
        throw new NotFoundException(
          `La categoría con el id ${updateProductoDto.idCategoria} no existe`,
        );
      }
    }

    const actualizarProducto = Object.assign(producto, updateProductoDto);
    if (updateProductoDto.idCategoria) {
      actualizarProducto.categoria = {
        id: updateProductoDto.idCategoria,
      } as Categoria;
    }
    return this.productosRepository.save(actualizarProducto);
  }

  async remove(id: number) {
    const producto = await this.findOne(id);
    await this.productosRepository.delete(producto.id);
    return {
      message: 'Producto eliminado exitosamente',
      producto,
    };
  }
}
