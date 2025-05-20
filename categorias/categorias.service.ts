import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const nombre = createCategoriaDto.nombre.toLowerCase().trim();
    const existe = await this.categoriasRepository.findOneBy({ nombre });
    if (existe) {
      throw new ConflictException(
        `La categoria con el nombre "${nombre}" ya existe`,
      );
    }
    const categoria = this.categoriasRepository.create({ nombre });
    return this.categoriasRepository.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return this.categoriasRepository.find();
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findOneBy({ id });
    if (!categoria) {
      throw new NotFoundException(`La categoria con el id ${id} no existe`);
    }
    return categoria;
  }

  async update(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    const categoria = await this.findOne(id);

    if (updateCategoriaDto.nombre) {
      const nombre = updateCategoriaDto.nombre.toLowerCase().trim();
      const existe = await this.categoriasRepository.findOne({
        where: { nombre },
      });
      if (existe && existe.id !== id) {
        throw new ConflictException(
          `La categoria con el nombre "${nombre}" ya existe`,
        );
      }
      categoria.nombre = nombre;
    }

    Object.assign(categoria, updateCategoriaDto);
    return this.categoriasRepository.save(categoria);
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    await this.categoriasRepository.delete(categoria.id);
    return {
      message: 'Categoría eliminada exitosamente',
      categoria,
    };
  }
}
