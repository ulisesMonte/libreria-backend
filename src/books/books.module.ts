import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Editorial } from 'src/editorial/entities/editorial.entity';
import { EditorialService } from 'src/editorial/editorial.service';
import { AutorService } from 'src/autor/autor.service';
import { Autor } from 'src/autor/entities/autor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Editorial, Autor])],
  controllers: [BooksController],
  providers: [BooksService, EditorialService, AutorService, ]
})
export class BooksModule {}
