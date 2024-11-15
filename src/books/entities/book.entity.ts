import { Editorial } from "src/editorial/entities/editorial.entity";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Autor } from "src/autor/entities/autor.entity";
import { ManyToMany } from "typeorm";
import { JoinColumn } from "typeorm";
@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @ManyToMany(() => Autor, (autor) => autor.books)
    @JoinTable() 
    autores: Autor[];

    
    @Column()
    categoria: string;

    @Column("decimal")
    precio: number;

    @Column("date")
    fechaLanzamiento: Date;

    @Column()
    descripcion: string;

    @ManyToOne(() => Editorial, (editorial) => editorial.books)
    @JoinColumn({name:"editorialId"})
    editorialObj: Editorial;

    editorialName: string; 
}
