import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: false })
  tipoPlano!: string;

  @Column({ length: 100, nullable: false })
  tempoRevisao!: string;

  @OneToMany(() => Produto, (produto) => produto.categoria)
  produto!: Produto[]
  
}