import { Module, Options } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { TodoModule } from './todo/todo.module';
import { ToDo } from './todo/entities/todo.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'mydatabase',
      entities: [User,ToDo],
      synchronize: true,
    }),
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
    }),
    TodoModule
  ],
})
export class AppModule {}