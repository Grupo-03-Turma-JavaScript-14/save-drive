import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioController {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      relations: {
        contratos: {
          produto: true,
          categoria: true,
        },
      },
    });
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: {
        contratos: {
          produto: true,
          categoria: true,
        },
      },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({
      where: { email },
      relations: {
        contratos: {
          produto: true,
          categoria: true,
        },
      },
    });
  }

  async findAllByNome(nome: string): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        contratos: {
          produto: true,
          categoria: true,
        },
      },
    });
  }

  async create(usuario: Usuario): Promise<Usuario> {
    return await this.usuarioRepository.save(usuario);
  }

  async update(usuario: Usuario): Promise<Usuario> {
    const usuarioExistente = await this.findById(usuario.id);

    const usuarioAtualizado = this.usuarioRepository.merge(
      usuarioExistente,
      usuario,
    );

    return await this.usuarioRepository.save(usuarioAtualizado);
  }

  async delete(id: number): Promise<{ message: string }> {
    const usuario = await this.findById(id);
    await this.usuarioRepository.remove(usuario);

    return { message: 'Usuário deletado com sucesso.' };
  }
}