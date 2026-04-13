import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  tipoPlano!: string;

  @IsNumber()
  valorBase!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  tempoRevisao!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  periodoEspera!: string;
}