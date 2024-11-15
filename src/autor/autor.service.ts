import { Injectable } from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Autor } from './entities/autor.entity';
import { Repository } from 'typeorm';
@Injectable()
export class AutorService {

  constructor(
    @InjectRepository(Autor)
    private readonly autorRepository:Repository<Autor>
  ){ }


  
  async create(createAutorDto: CreateAutorDto) {
    const existingAutor = await this.autorRepository.findOne({where:{dni:createAutorDto.dni}})

    if(existingAutor){
      throw new Error("el autor ya existe")
    }

    const autor = this.autorRepository.create(createAutorDto)
    return await this.autorRepository.save(autor)

  }



  async findbyName(name:string, apellido:string){
    const autor = this.autorRepository.findOne({
      where: { nombre: name, apellido:apellido},
    });  

    if(!autor){
      throw new Error("El autor no existe")
    }
    return autor
  }


  async findByid(id:number){
    return this.autorRepository.findOneBy({id})
  }

  findAll() {
    return this.autorRepository.find()
  }


  async update(id: number, updateAutorDto: UpdateAutorDto) {
    const autor = await this.autorRepository.findOneBy({id});

    if (!autor) {
      throw new Error('Autor no encontrado');
    }

    //setea el nuevo book
    autor.nombre = updateAutorDto.nombre ?? autor.nombre;
    autor.apellido = updateAutorDto.apellido ?? autor.apellido;
    autor.dni = updateAutorDto.dni ?? autor.dni;
    autor.nacionalidad = updateAutorDto.nacionalidad ?? autor.nacionalidad;

    await this.autorRepository.save(autor);
    
    return autor;  // retprna eñ vañlor actializado
  }

  remove(id: number) {
    return this.autorRepository.delete({id})
  }
}
