import { IsInt } from 'class-validator';

export class CreateContratoDto {
  @IsInt()
  produtoId!: number;

  @IsInt()
  categoriaId!: number;

  @IsInt()
  usuarioId!: number;
}