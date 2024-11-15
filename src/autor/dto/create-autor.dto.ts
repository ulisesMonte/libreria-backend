import { IsString, Matches } from "class-validator";

export class CreateAutorDto {

    @IsString()
    nombre: string;


    @Matches(/^\d{8}$/, { message: 'El DNI debe tener exactamente 8 dígitos.' })
    dni: number;
    
    @IsString()
    apellido:string
    

    @IsString()
    nacionalidad:string;

}
