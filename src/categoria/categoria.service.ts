import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return await this.categoriaRepository.save(createCategoriaDto);
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find();
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
    });

    if (!categoria) {
      throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
    }

    return categoria;
  }

  async update(
  id: number,
  updateCategoriaDto: UpdateCategoriaDto,
): Promise<Categoria> {
  await this.findOne(id);

  const categoriaAtualizada = {
    ...updateCategoriaDto,
    id,
  };

  return await this.categoriaRepository.save(categoriaAtualizada);
}

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);

    return await this.categoriaRepository.delete(id);
  }
}