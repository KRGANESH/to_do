import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UnauthorizedException, NotFoundException, ConsoleLogger } from '@nestjs/common';
import { TodoService } from './todo.service';
import { JwtService } from '@nestjs/jwt';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService, private readonly jwtService: JwtService) {}

  @Post('create')
  async createTodo(@Body() todoData: { description: string }, @Req() req:any) {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token);
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
    const userId = decoded.id;
    const data=todoData.description;
    try{
      const createdTodo = await this.todoService.createTodo(userId, data);
      return { message: 'Todo created successfully',createdTodo };
    }
    catch (error) {
      throw new NotFoundException('Failed to create todo');
    }
  }

  @Get('read')
  async read(@Req() req:Request) {
    const token =  req.headers['authorization']?.split(' ')[1];
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
    const userId = decoded.id;
    try{
      const todoItems = await this.todoService.readTodo(userId);
      return { message: 'ToDo Items ',todoItems };
    }
    catch (error) {
      throw new NotFoundException('Failed to retrieve todo');
    }
  }

@Patch('update')
async updateTodo(@Body() updateItem: {data:string ,id:number}, @Req() req:Request){
  const token =  req.headers['authorization']?.split(' ')[1];
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
  const userId = decoded.id;
  console.log(updateItem.data,updateItem.id);
  try{
    const updateData = await this.todoService.updateTodo(updateItem.data,userId,updateItem.id);
    return { message: 'updated successfuly', updateData};
  }
  catch (error) {
    throw new NotFoundException('Failed update');
  }
}

@Delete('delete')
async deleteTodo(@Body()  deleteItem: {id:number}, @Req() req:Request){
  const token =  req.headers['authorization']?.split(' ')[1];
  if (!token) {
    throw new UnauthorizedException('Unauthorized');
  }
  let decoded;
  try {
    decoded = this.jwtService.verify(token);
  } catch (error) {
    throw new UnauthorizedException('Unauthorized');
  }
  const userId = decoded.id;
  try {
    await this.todoService.deleteTodo(deleteItem.id,userId);
    return { message: 'Todo deleted successfully'};
  } catch (error) {
    throw new NotFoundException('Failed to delete todo');
  }
}


}
