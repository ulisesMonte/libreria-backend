import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateEditorialDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @Matches(/^30-\d{8}-[1-3]$/, {
    message: "El CUIL debe tener el formato ##-########-# y comenzar con un número válido."
})
  CUIL: string;
}