import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Contrato } from './entities/contrato.entity';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { Produto } from '../produto/entities/produto.entity';
import { Categoria } from '../categoria/entities/categoria.entity';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class ContratoService {
  constructor(
    @InjectRepository(Contrato)
    private readonly contratoRepository: Repository<Contrato>,

    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createContratoDto: CreateContratoDto): Promise<Contrato> {
    const { produtoId, categoriaId, usuarioId, ano, data } = createContratoDto;

    const produto = await this.produtoRepository.findOne({
      where: { id: produtoId },
      relations: ['categoria'],
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado.');
    }

    const categoria = await this.categoriaRepository.findOne({
      where: { id: categoriaId },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada.');
    }

    const usuario = await this.usuarioRepository.findOne({
      where: { id: usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const dataContrato = new Date(data);

    if (isNaN(dataContrato.getTime())) {
      throw new BadRequestException('Data inválida.');
    }

    const anoAtual = dataContrato.getFullYear();

    if (ano > anoAtual) {
      throw new BadRequestException(
        'O ano do veículo não pode ser maior que o ano da data do contrato.',
      );
    }

    const valorBase = Number(produto.valorBase);

    if (isNaN(valorBase)) {
      throw new BadRequestException('O valor base do produto é inválido.');
    }

    const idadeVeiculo = anoAtual - ano;

    let valorContrato = valorBase;

    if (idadeVeiculo > 10) {
      valorContrato = valorBase * 0.8;
    }

    const contrato = this.contratoRepository.create({
      produto,
      categoria,
      usuario,
      ano,
      data,
      valorContrato: Number(valorContrato.toFixed(2)),
    });

    return await this.contratoRepository.save(contrato);
  }

  async findAll(): Promise<Contrato[]> {
    return await this.contratoRepository.find();
  }

  async findOne(id: number): Promise<Contrato> {
    const contrato = await this.contratoRepository.findOne({
      where: { id },
    });

    if (!contrato) {
      throw new NotFoundException('Contrato não encontrado.');
    }

    return contrato;
  }

  async delete(id: number): Promise<{ message: string }> {
    const contrato = await this.findOne(id);
    await this.contratoRepository.remove(contrato);

    return { message: 'Contrato deletado com sucesso.' };
  }
}