import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity({ name: "tb_produtos" })
export class Produto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: false })
  modelo!: string;

  @Column({ length: 100, nullable: false })
  marca!: string;

  @Column({ type: "int", nullable: false })
  ano!: number;

  @Column("decimal", { precision: 10, scale: 2, nullable: false })
  valorBase!: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: "CASCADE",
  })
  categoria!: Categoria;
}