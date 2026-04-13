import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ContratoService } from './contrato.service';
import { CreateContratoDto } from './dto/create-contrato.dto';

@Controller('/contratos')
export class ContratoController {
  constructor(private readonly contratoService: ContratoService) {}

  @Post()
  create(@Body() createContratoDto: CreateContratoDto) {
    return this.contratoService.create(createContratoDto);
  }

  @Get()
  findAll() {
    return this.contratoService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contratoService.findOne(id);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.contratoService.delete(id);
  }
}