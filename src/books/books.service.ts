import { Injectable } from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { EditorialService } from 'src/editorial/editorial.service';
import { AutorService } from 'src/autor/autor.service';
@Injectable()
export class BooksService {


  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly editorialService: EditorialService,
    private readonly autorService: AutorService,
  ){ }


  async removeAutorFromBook(bookId: number, autorId: number) {
    const book = await this.bookRepository.findOne({ where: { id: bookId }, relations: ['autores'] });

    if (book) {
      await this.bookRepository
        .createQueryBuilder()
        .relation(Book, 'autores') 
        .of(book)  
        .remove({ id: autorId });
    } else {
      throw new Error('El libro no fue encontrado');
    }
  }



  async create(createBookDto: CreateBookDto) {

    const autores = []; 
    const autorEntities = await Promise.all(
      createBookDto.autores.map(async (autor) => {
        const [nombre, apellido] = autor.split(" ");
        
        const autorExistente = await this.autorService.findbyName(nombre, apellido);
  
        if (autorExistente) {
          autores.push(autorExistente);  
        } else {
          
          console.log(`Autor no encontrado: ${nombre} ${apellido}`);
        }
      }),
    );
  
    const editorial = await this.editorialService.findOneByString(createBookDto.editorialName);
  
    const book = this.bookRepository.create({
      ...createBookDto,
      autores,  
      editorialObj: editorial,  
    });
  
    return await this.bookRepository.save(book);;  

  }


  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({
      relations: ['editorialObj', "autores"],  //indiciamos que la accion debe cargarse conl a relacion
    });
  }

  async findOne(id: number) {
    return await this.bookRepository.findOneBy({id})
  }




  async update(id: number, updateBookDto: UpdateBookDto) {

    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['autores'],  // busca los libros en la db
    });

    if (!book) {
      throw new Error('Libro no encontrado');
    }

    // actualzia la enitdad book
    if(updateBookDto.titulo)
    book.titulo = updateBookDto.titulo;

    if(updateBookDto.categoria)
    book.categoria = updateBookDto.categoria;

    if(updateBookDto.precio)
    book.precio = updateBookDto.precio;
    
    if(book.fechaLanzamiento)
    book.fechaLanzamiento = updateBookDto.fechaLanzamiento;
    
    if(updateBookDto.descripcion)
    book.descripcion = updateBookDto.descripcion;
    
    //actualzia la editorail
    if (updateBookDto.editorialName) {
      book.editorialObj = await this.editorialService.findOneByString(updateBookDto.editorialName);
    }

    if (updateBookDto.autores && updateBookDto.autores.length > 0) {
      const autores = await Promise.all(
        updateBookDto.autores.map(async (autor) => {
          const [nombre, apellido] = autor.split(" ")
          return await this.autorService.findbyName(nombre,apellido);
        }),
      );
      book.autores = autores;
    }

    return this.bookRepository.save(book);
  }

  async remove(id: number) {
    return await this.bookRepository.delete({id})
  }


  async findByCategory(category: string) {
    return await this.bookRepository.find({
      where: { categoria: category }, 
    });
  }




}
