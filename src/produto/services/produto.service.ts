import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,

        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ) {}

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations: {
                categoria: true
            }
        });
    }

    async findById(id: number): Promise<Produto> {
        const produto = await this.produtoRepository.findOne({
            where: { id },
            relations: {
                categoria: true
            }
        });

        if (!produto) {
            throw new HttpException("Produto não encontrado!", HttpStatus.NOT_FOUND);
        }

        return produto;
    }

    async create(produto: Produto): Promise<Produto> {
        const categoria = await this.categoriaRepository.findOne({
            where: { id: produto.categoria.id }
        });

        if (!categoria) {
            throw new HttpException("Categoria não encontrada!", HttpStatus.NOT_FOUND);
        }

        produto.categoria = categoria;

        return await this.produtoRepository.save(produto);
    }

    async update(produto: Produto): Promise<Produto> {
        await this.findById(produto.id);

        const categoria = await this.categoriaRepository.findOne({
            where: { id: produto.categoria.id }
        });

        if (!categoria) {
            throw new HttpException("Categoria não encontrada!", HttpStatus.NOT_FOUND);
        }

        produto.categoria = categoria;

        return await this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);

        return await this.produtoRepository.delete(id);
    }
}