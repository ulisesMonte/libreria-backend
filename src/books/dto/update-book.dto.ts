import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {

    titulo: string;
    autor: string;
    categoria: string;
    precio: number;
    fechaLanzamiento: Date;
    descripcion: string;
}
