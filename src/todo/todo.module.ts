import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { ToDo } from './entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ToDo])
],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
