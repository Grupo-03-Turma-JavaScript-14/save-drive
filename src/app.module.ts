import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './produto/entities/produto.entity';
import { ProdutoModule } from './produto/produto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CategoriaModule } from './categoria/categoria.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { Categoria } from './categoria/entities/categoria.entity';
import { ContratoModule } from './contrato/contrato.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_savedrive',
      entities: [Produto, Usuario, Categoria],
      synchronize: true,
    }),
    ProdutoModule,
    UsuarioModule,
    CategoriaModule,
    ContratoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}