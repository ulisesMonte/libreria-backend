import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditorialModule } from './editorial/editorial.module';
import { Book } from './books/entities/book.entity';
import { Editorial } from './editorial/entities/editorial.entity';
import { EditorialService } from './editorial/editorial.service';
import { EditorialController } from './editorial/editorial.controller';
import { AutorModule } from './autor/autor.module';
import { Autor } from './autor/entities/autor.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3308,
      username: "user",
      password: "12A34B56C",
      database: "db_crud",
      autoLoadEntities: true,
      synchronize: true,
      entities:[Book, Editorial, Autor]
    }),
    BooksModule,       
    EditorialModule, 
    AutorModule,
  ],
  controllers: [EditorialController],
  providers: [EditorialService],
})
export class AppModule {} 
