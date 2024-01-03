import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginUserParams } from 'src/utils/type';


@Controller('user')
export class UserController {
  constructor(private userService: UserService){

  }
  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.registerUser(createUserDto);
      return { message: 'User registered successfully', user: newUser };
    } catch (error) {
      if (error instanceof Error) {
        return { message: error.message, error: 'Bad Request', statusCode: 400 };
      } else {
        return { message: 'Failed to register user', error: 'Internal Server Error', statusCode: 500 };
      }
    }
  }


  @Post('login')
  async loginUser(@Body() loginUserParams: LoginUserParams) {
    try {
      const { user, token } = await this.userService.loginUser(loginUserParams);
  
  
      const userWithoutPassword = { ...user, password: undefined };
  
      return { message: 'Login successful', user: userWithoutPassword, token };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return { message: 'Invalid credentials', error: 'Unauthorized', statusCode: 401 };
      } else {
        return { message: 'Failed to login', error: 'Internal Server Error', statusCode: 500 };
      }
    }
  }
  
}
