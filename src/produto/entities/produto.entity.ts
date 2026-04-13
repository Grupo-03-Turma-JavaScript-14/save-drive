import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity({ name: "tb_produtos" })
export class Produto {

    
    @PrimaryGeneratedColumn()
    id!: number;

   
    @Column({ length: 100, nullable: false })
    modelo!: string;

   
    @Column({ length: 100, nullable: false })
    marca!: string;


    @Column({ nullable: false })
    ano!: number;

    
    @Column({ length: 10, nullable: false, unique: true })
    placa!: string;

   
    @Column("decimal", { precision: 10, scale: 2, nullable: false })
    valorBase!: number;

    @Column({ default: true })
    ativo!: boolean;

    @ManyToOne(() => Usuario, (usuario) => usuario.produto, {onDelete: "CASCADE"})
    usuario!: Usuario

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {onDelete: "CASCADE"})
    categoria!: Categoria
    
}