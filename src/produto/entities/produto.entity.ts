import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tb_produtos" })
export class Produto {

    // Identificador único do produto
    @PrimaryGeneratedColumn()
    id!: number;

    // Modelo do carro
    @Column({ length: 100, nullable: false })
    modelo!: string;

    // Marca do carro
    @Column({ length: 100, nullable: false })
    marca!: string;

    // Ano de fabricação do carro
    @Column({ nullable: false })
    ano!: number;

    // Placa do carro
    @Column({ length: 10, nullable: false, unique: true })
    placa!: string;

    // Valor base do seguro
    @Column("decimal", { precision: 10, scale: 2, nullable: false })
    valorBase!: number;

    // Status do produto no sistema
    @Column({ default: true })
    ativo!: boolean;
}