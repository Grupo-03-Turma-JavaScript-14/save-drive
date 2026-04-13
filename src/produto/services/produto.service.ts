import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";
import { CategoriaService } from "../../categoria/services/categoria.service";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        private categoriaService: CategoriaService
    ) {}

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations:{
                usuario: true,
                categoria: true
            }
        });
    }

   
    async findById(id: number): Promise<Produto> {
        const produto = await this.produtoRepository.findOne({
            where: { id },
             relations:{
                usuario: true,
                categoria: true
            }
        });

        if (!produto) {
            throw new HttpException("Produto não encontrado!", HttpStatus.NOT_FOUND);
        }

        return produto;
    }

  
    async create(produto: Produto): Promise<Produto> {
        if (produto.categoria != null) {
           
            let categoria = await this.categoriaService.findOne(produto.categoria.id)
 
            if (!categoria)
                throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
 
              return await this.produtoRepository.save(produto);
        }else{
            throw new HttpException('Categoria nao pode ser nula!', HttpStatus.NOT_FOUND);
        }
   
    }

 
    async update(produto: Produto): Promise<Produto> {
        let buscaProduto: Produto = await this.findById(produto.id);
 
        if (!buscaProduto || !produto.id)
            throw new HttpException('Produto não encontrada!', HttpStatus.NOT_FOUND);
 
        if (produto.categoria){
           
            let categoria = await this.categoriaService.findOne(produto.categoria.id)
               
            if (!categoria)
                throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
               
            return await this.produtoRepository.save(produto);
   
        }else{
            throw new HttpException('Categoria nao pode ser nula!', HttpStatus.NOT_FOUND);
        }
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);

        return await this.produtoRepository.delete(id);
    }
}