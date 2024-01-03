import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { TodoService } from './todo.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService, private readonly jwtService: JwtService) {}

  @Post('create')
  async createTodo(@Body() tododata:any, @Req() req:Request) {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }
    let decoded;
    try{
      decoded = this.jwtService.verify(token);
    }
    catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
    const username = decoded.username;
    try{
      const createdTodo = await this.todoService.createTodo(username, tododata);
      return { message: 'Todo created successfully', username, createdTodo };
    }
    catch (error) {
      throw new NotFoundException('Failed to create todo');
    }
  }

  @Get('read')
  async read(@Body() @Req() req:Request) {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }
    let decoded;
    try{
      decoded = this.jwtService.verify(token);
    }
    catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
    const username = decoded.username;
    try{
      const todoItems = await this.todoService.readTodo(username);
      return { message: 'ToDo Items ', username, todoItems };
    }
    catch (error) {
      throw new NotFoundException('Failed to create todo');
    }
  }

@Patch('update')
async updateTodo(@Body()  data:string ,id:any, @Req() req:Request){
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    throw new UnauthorizedException('Unauthorized');
  }
  let decoded;
  try{
    decoded = this.jwtService.verify(token);
  }
  catch (error) {
    throw new UnauthorizedException('Unauthorized');
  }
  const username = decoded.username;
  try{
    const updateData = await this.todoService.updateTodo(data,id);
    return { message: 'updated successfuly'};
  }
  catch (error) {
    throw new NotFoundException('Failed update');
  }
}

@Delete('delete')
async deleteTodo(@Body()  id:any, @Req() req:Request){
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    throw new UnauthorizedException('Unauthorized');
  }
  let decoded;
  try {
    decoded = this.jwtService.verify(token);
  } catch (error) {
    throw new UnauthorizedException('Unauthorized');
  }
  try {
    await this.todoService.deleteTodo(id);
    return { message: 'Todo deleted successfully'};
  } catch (error) {
    throw new NotFoundException('Failed to delete todo');
  }
}


}
