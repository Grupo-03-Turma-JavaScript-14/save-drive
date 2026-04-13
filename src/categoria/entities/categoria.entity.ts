import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: false })
  tipoPlano!: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  valorBase!: number;

  @Column({ length: 100, nullable: false })
  tempoRevisao!: string;

  @Column({ length: 100, nullable: false })
  periodoEspera!: string;
}