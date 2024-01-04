import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(ToDo) private readonly todoRepository: Repository<ToDo>){}

//Create todo
  async createTodo(userId: number, todoData:string): Promise<ToDo>{
    const todo = this.todoRepository.create({
      user_id: userId,
      description: todoData,
    });
  return await this.todoRepository.save(todo);
  }

  //read todo
  async readTodo(userId: number): Promise<ToDo[]>{
    try {
      const todos = await this.todoRepository.find({
        where: { user_id: userId },
      });
      return todos;
    } 
      catch (error) {
        throw new NotFoundException(`Todos not found for username: ${userId}`);
    }
  }

  //update todo
  async updateTodo(data: string, userId: number, id: number): Promise<ToDo> {
    const todo = await this.todoRepository.findOne({
      where: { id: id },
    });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
  
    if (todo.user_id !== userId) {
      throw new UnauthorizedException('Unauthorized to update this todo');
    }
  
    todo.description = data;
    return await this.todoRepository.save(todo);
  }
  
  
  
//delete to do
  async deleteTodo(id:number,userId:number){
    const todo = await this.todoRepository.findOne({
      where: { id: id },
    });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    if (todo.user_id !== userId) {
      throw new UnauthorizedException('Unauthorized to delete this todo');
    }
    await this.todoRepository.remove(todo);
  }

}

