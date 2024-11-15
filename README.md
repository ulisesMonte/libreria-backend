# Backend

-recursos

https://docs.nestjs.com/techniques/database

:https://bluuweb.dev/nestjs/crud-mysql.html

**Importante:**

-Para que se conecte a la Base de datos de una forma correcta debemos iniciar el docker compose con `docker-compose up`

-y desspues debemos crear la conexion en el db management, en mi caso table plus

---

Book

-primero creamos los modulos books 

**`nest g res books --no-spec`**

-con esto creamos los modulos

-luego creamos un class validator para convertir los datos 

`const app = await NestFactory.create(AppModule);`

`app.setGlobalPrefix("/api/");
app.useGlobalPipes(
new ValidationPipe({
whitelist: true,
forbidNonWhitelisted: true,
transform: true,
})
);` 

-esto añadire el prefijo de la api, elimina propiedades no permitidas, convierte los datos al tipo espero, segun los Dtos

-ahora en books.entitys.ts modificaremos y setearemos la entidad para la bd 

-para hacer esto usaremos typeorm

-usaremos el patron de diseño repository

-ahora creamos y definimos nuestra entidad books 

-luego en el books moduls importados el typeormmodule y el book

-luegeo de eso creamos el repository en el service

-modificamos el create para que mapee los autores y busque  en el autorservice si existen o no, si no existen lanzara un erorr

-en el update seteamos el objeto para actualziarlo

-haremos lo mismo con editorial, pero con el nombre

-y en el findall llamamos al repository para que consulte con la db

-luego creamos loss dto para el create

-luego en el findone agregamos el repository de findoneby id

-luego en el delete del service modificamos y hacemos que elimine x el id

-utilizaremos delete

-luego en el update, invocamos al updatebooks dto y en el repository pasamos el id, y el objeto

-tambien creaoms el metodo para filtrar por categorias

---

Editorial

-Para crear el paquete de la editorial hacemos 

`nest g res editorial --no-spec`

-luego en el providers de books, agrego la editorial y en editorial creo la entidad con la relacion a books

-luego en el dto agrego el matches en el cuil para que tenga formato cuil

-en el book service agregamos que exista la editoriaL

-hacemos que verifique si el cuil esta repetido, para que si existe otra lanze un error

-creo la funcion findonebystring que busca la editorial por el nombre 

-luego en el book service aregar que si no existe la editorial lance un error

---

Autor

-creamos el paquete autor

-en el crud de autor debemos buscar si ya existe otro autor, si existe lanzara nu error

-luego creamos el metodo para que busque por el nombre del autor

-creamos la relacion con books

-luego seteamos el dto y el update

-en el update buscamos si existe el autor con el mismo dni

-para eliminar un autor primero eliminamos la relacion con el libro, para eso creaoms 

---

para hacer el input los datos debens er ingresados de esta forma