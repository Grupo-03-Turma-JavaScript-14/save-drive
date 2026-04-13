import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}