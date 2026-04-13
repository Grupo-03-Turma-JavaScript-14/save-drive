import { IsNotEmpty } from "class-validator";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Produto } from "../../produto/entities/produto.entity";

@Entity ({name: "tb_usuarios"})
export class Usuario {
    @PrimaryGeneratedColumn()
    id!: number

    @IsNotEmpty()
    @Column ({length: 100, nullable: false})
    nome!: string

    @IsNotEmpty()
    @Column ({length: 100, unique: true, nullable: false})
    email!: string

    @IsNotEmpty()
    @Column ({length: 14, unique: true, nullable: false})
    cpf!: string

    @IsNotEmpty()
    @Column ({length: 100, nullable: false})
    cidade!: string

    @IsNotEmpty()
    @Column ({length: 2, nullable: false})
    estado!: string

    @OneToMany(() => Produto, (produto) => produto.usuario)
    produto!: Produto[]

}