import { IsDateString, IsInt, Min } from 'class-validator';

export class CreateContratoDto {
  @IsInt()
  produtoId!: number;

  @IsInt()
  categoriaId!: number;

  @IsInt()
  usuarioId!: number;

  @IsInt()
  @Min(1900)
  ano!: number;

  @IsDateString()
  data!: string;
}