import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ContratoService {
    
    calcularSeguroCarro(dados: any) {
        if (dados.valorVeiculo < 5000) {
            throw new BadRequestException('Não realizamos seguros para veículos com valor inferior a R$ 5.000,00');
        }

        if (dados.idadeCondutor < 18) {
            throw new BadRequestException('O condutor deve ser maior de idade.');
        }

        const { valorVeiculo, idadeCondutor, usoProfissional, anoFabricacao, anosSemAcidente } = dados;
        
        let valorFinal = valorVeiculo * 0.05; 

        if (idadeCondutor < 25) {
            valorFinal *= 1.20;
        }

        if (usoProfissional === true) {
            valorFinal *= 1.15;
        }

        if (anoFabricacao < 2014) {
            valorFinal += 500;
        }

        if (anosSemAcidente > 0) {
            const descontoBonus = Math.min(anosSemAcidente * 0.05, 0.25);
            valorFinal *= (1 - descontoBonus);
        }

        const totalCalculado = Number(valorFinal.toFixed(2));

        return {
            valorSeguro: totalCalculado,
            opcoesPagamento: this.gerarOpcoesParcelamento(totalCalculado)
        };
    }

    gerarOpcoesParcelamento(valorTotal: number) {
        return {
            aVista: Number((valorTotal * 0.90).toFixed(2)),
            parcelado6x: Number((valorTotal / 6).toFixed(2)),
            parcelado12x: Number(((valorTotal * 1.10) / 12).toFixed(2)), 
        };
    }
}