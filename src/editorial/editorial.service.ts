import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';
import { Editorial } from './entities/editorial.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EditorialService {
  constructor(
    @InjectRepository(Editorial)
    private readonly editorialRepository: Repository<Editorial>
  ){}
  
  async create(createEditorialDto: CreateEditorialDto) {

    const existingEditorial = await this.editorialRepository.findOne({where:{CUIL: createEditorialDto.CUIL}})

    if(existingEditorial){
      throw new BadRequestException("EL CUIL YA ESTA REGISTRADO")
    }

    const editorial = this.editorialRepository.create(createEditorialDto);
    return await this.editorialRepository.save(editorial);
  }

  findAll() {
    return  this.editorialRepository.find();
  }

  findOne(id: number) {
    return this.editorialRepository.findOneBy({id});
  }

  async findOneByString(name: string) {
    const editorial = await this.editorialRepository.findOne({
      where: { nombre: name },
    });  
    if(!editorial) {
      throw new Error("la editorial no existe")
    }

    return editorial
  }


    
  async update(id: number, updateEditorialDto: UpdateEditorialDto) {
    const editorial = await this.editorialRepository.findOne({ where: { id } });

    if (!editorial) {
      throw new Error('Editorial no encontrada');
    }

    if (updateEditorialDto.nombre) {
      editorial.nombre = updateEditorialDto.nombre;
    }
    if (updateEditorialDto.direccion) {
      editorial.direccion = updateEditorialDto.direccion;
    }
    if (updateEditorialDto.CUIL) {
      editorial.CUIL = updateEditorialDto.CUIL;
    }

    await this.editorialRepository.save(editorial);
    
    return editorial;
  }  

  remove(id: number) {
    return this.editorialRepository.delete(id)
  }
}
