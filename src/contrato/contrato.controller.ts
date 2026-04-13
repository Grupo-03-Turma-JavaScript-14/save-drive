import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ContratoService } from '../contrato/contrato.service';

@Controller('contratos')
export class ContratoController {
  constructor(private readonly contratoService: ContratoService) {}

@Post('carro')
async calcular(@Body() body: any) {
  const total = this.contratoService.calcularSeguroCarro(body);

  return {
    mensagem: "Cálculo de seguro Save-Drive realizado",
    valorFinal: total.valorSeguro,
    opcoesPagamento: total.opcoesPagamento
  };
}

}