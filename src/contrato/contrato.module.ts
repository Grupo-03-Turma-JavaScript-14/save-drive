import { Module } from '@nestjs/common';
import { ContratoController } from './contrato.controller';
import { ContratoService } from './contrato.service';

@Module({
  imports: [],
  controllers: [ContratoController],
  providers: [ContratoService],
  
  exports: [ContratoService], 
})
export class ContratoModule {}