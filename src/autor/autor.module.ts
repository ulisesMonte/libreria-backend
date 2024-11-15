import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';  
import { AutorService } from './autor.service';  
import { AutorController } from './autor.controller';
import { Autor } from './entities/autor.entity';  
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Autor]),
    BooksModule
  ],
  controllers: [AutorController],  
  providers: [AutorService],  
})
export class AutorModule {}
