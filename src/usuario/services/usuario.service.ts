import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";
import { DeleteResult } from "typeorm";

@Injectable ()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>
    ) {}

    async findAll (): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            relations:{
                produto: true
            }
        });
    }
    async findById(id: number): Promise <Usuario> {
        const usuario = await this.usuarioRepository.findOne ({
            where: {
                id
            },
            relations:{
                produto: true
            }
        })

        if(!usuario)
            throw new HttpException ("Usuario não encontrado", HttpStatus.NOT_FOUND);

        return usuario;
    }
    async findAllByNome(nome: string): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations:{
                produto: true
            }
        })
    }
    async create (usuario: Usuario): Promise<Usuario> {
        return await this.usuarioRepository.save(usuario);
    }
    async update(usuario: Usuario): Promise<Usuario>{
        await this.findById(usuario.id)
        return await this.usuarioRepository.save(usuario)
    }
    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)
        return await this.usuarioRepository.delete(id)
    }
}