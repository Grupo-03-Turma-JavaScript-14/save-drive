import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Contrato } from '../../contrato/entities/contrato.entity';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: false })
  nome!: string;

  @Column({ length: 100, nullable: false, unique: true })
  email!: string;

  @Column({ length: 255, nullable: false })
  senha!: string;

  @OneToMany(() => Contrato, (contrato) => contrato.usuario)
  contratos!: Contrato[];
}