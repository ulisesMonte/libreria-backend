import { Entity, Column, OneToMany } from "typeorm";
import { IsString, Matches } from "class-validator";
import { Book } from "src/books/entities/book.entity";

@Entity()
export class Editorial {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    direccion: string;

    @Column()
    nombre: string;

    @OneToMany(() => Book, (book) => book.editorialObj)
    books: Book[];
    
    @Column({nullable:false, unique:true})
    CUIL: string;
}
