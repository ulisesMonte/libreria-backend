import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Book } from "src/books/entities/book.entity";

@Entity()
export class Autor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido:string
    
    @Column()
    dni:Number;

    @Column()
    nacionalidad:string;

    @ManyToMany(() => Book, (book) => book.autores)
    books: Book[];
}