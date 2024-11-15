import { PartialType } from '@nestjs/mapped-types';
import { CreateEditorialDto } from './create-editorial.dto';
import { IsString,IsOptional } from 'class-validator';

export class UpdateEditorialDto extends PartialType(CreateEditorialDto) {

    @IsOptional() 
    @IsString()
    nombre?: string;
  
    @IsOptional()
    @IsString()
    direccion?: string;
  
    @IsOptional()
    @IsString()
    CUIL?: string; 


    
}
