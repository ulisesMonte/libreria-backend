import { IsString, IsNumber, IsDate, IsArray, ValidateIf } from 'class-validator';

import { Type } from 'class-transformer';
export class CreateBookDto {
    @IsString()
    titulo: string;
    @IsString()
    categoria: string;

    @IsNumber()
    precio: number;


    @IsString()
    editorialName: string;


    @IsArray()
    autores?:string[]; 



    @IsDate()
    @Type(()=>Date)
    fechaLanzamiento: Date;

    @IsString()
    descripcion: string;
}
