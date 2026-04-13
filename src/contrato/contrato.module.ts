import { Module } from '@nestjs/common';
import { ContratoController } from './contrato.controller';
import { ContratoService } from './contrato.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [ContratoController],
  providers: [ContratoService],
  exports: [ContratoService], 
})
export class ContratoModule {}