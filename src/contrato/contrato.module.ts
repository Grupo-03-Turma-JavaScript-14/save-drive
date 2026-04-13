import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContratoController } from './contrato.controller';
import { ContratoService } from './contrato.service';
import { Contrato } from './entities/contrato.entity';
import { Produto } from '../produto/entities/produto.entity';
import { Categoria } from '../categoria/entities/categoria.entity';
import { Usuario } from '../usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contrato, Produto, Categoria, Usuario])],
  controllers: [ContratoController],
  providers: [ContratoService],
  exports: [ContratoService],
})
export class ContratoModule {}