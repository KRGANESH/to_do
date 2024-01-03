import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { TodoModule } from './todo/todo.module';
import { TodoModule } from './todo/todo.module';
import { TodoModule } from './todo/todo.module';
import { TodoModule } from './todo/todo.module';
import { TodoModule } from './todo/todo.module';
import { TodoModule } from './todo/todo.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'mydatabase',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    TodoModule,
  ],
})
export class AppModule {}