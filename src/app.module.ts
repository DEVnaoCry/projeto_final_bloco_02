import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorias } from './categorias/entities/categorias.entity';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '#21552019',
      database: 'db_farmacia',
      entities: [Categorias],
      synchronize: true,
    }),
    CategoriasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }