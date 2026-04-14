import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity({ name: 'tb_contratos' })
export class Contrato {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Produto, { eager: true, nullable: false, onDelete: 'CASCADE' })
  produto!: Produto;

  @ManyToOne(() => Categoria, { eager: true, nullable: false, onDelete: 'CASCADE' })
  categoria!: Categoria;

  @ManyToOne(() => Usuario, (usuario) => usuario.contratos, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  usuario!: Usuario;

  @Column({ type: 'int', nullable: false })
  ano!: number;

  @CreateDateColumn({ type: 'timestamp' })
  data!: Date;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  valorContrato!: number;
}