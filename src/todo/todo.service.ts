import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(ToDo) private readonly todoRepository: Repository<ToDo>){}

//Create todo
  async createTodo(username: string, todoData:any): Promise<ToDo>{
    const todo = this.todoRepository.create({
      username: username,
      description: todoData,
    });

    return await this.todoRepository.save(todo);
  }

  //read todo
  async readTodo(username: string): Promise<ToDo[]>{
    try {
      const todos = await this.todoRepository.find({
        where: { username: username },
      });
      return todos;
    } 
      catch (error) {
        throw new NotFoundException(`Todos not found for username: ${username}`);
    }
  }

  //update todo
  async updateTodo(data: string,id:number){

    const todo = await this.todoRepository.find({
        where: { id: id},
      });
      //todo.description = data;
 await this.todoRepository.save(todo);
  }
//delete to do
  async deleteTodo(id:number){
    const todo = await this.todoRepository.find({
      where: { id: id },
    });
    await this.todoRepository.remove(todo);
  }

}

