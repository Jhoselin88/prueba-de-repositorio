import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente) private clientesRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const email = createClienteDto.email.trim();
    const existe = await this.clientesRepository.findOneBy({ email });
    if (existe) {
      throw new ConflictException('El email ya está registrado');
    }
    const cliente = this.clientesRepository.create({
      nombres: createClienteDto.nombres.trim(),
      apellidos: createClienteDto.apellidos.trim(),
      direccion: createClienteDto.direccion.trim(),
      telefono: createClienteDto.telefono.trim(),
      email,
    });
    return this.clientesRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return await this.clientesRepository.find();
  }

  async findOne(id: number): Promise<Cliente> {
    const existe = await this.clientesRepository.findOneBy({ id });
    if (!existe) {
      throw new NotFoundException(`el cliente con el id ${id} no existe`);
    }
    return existe;
  }

  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    const cliente = await this.findOne(id);

    if (
      updateClienteDto.email &&
      updateClienteDto.email.trim() !== cliente.email
    ) {
      const existe = await this.clientesRepository.findOneBy({
        email: updateClienteDto.email.trim(),
      });
      if (existe && existe.id !== id) {
        throw new ConflictException('El email ya está registrado');
      }
      cliente.email = updateClienteDto.email.trim();
    }

    Object.assign(cliente, updateClienteDto);
    return this.clientesRepository.save(cliente);
  }

  async remove(id: number) {
    const cliente = await this.findOne(id);
    await this.clientesRepository.delete(cliente.id);
    return {
      message: 'Cliente eliminado exitosamente',
      cliente,
    };
  }
}
