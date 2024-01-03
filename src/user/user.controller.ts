import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, UnauthorizedException, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginUserParams } from 'src/utils/type';
import { JwtService } from '@nestjs/jwt';
import { Response } from '@nestjs/common';


@Controller('user')
export class UserController {
  constructor(private userService: UserService,
    private jwtService: JwtService){

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
  async loginUser(@Body() loginUserParams: LoginUserParams, @Res({passthrough: true}) response: Response) {
    try {
      const { user} = await this.userService.loginUser(loginUserParams);
      const userWithoutPassword = { ...user, password: undefined };
      const jwt = await this.jwtService.signAsync({id:user.id});
      return { message: 'Login successful', jwt,user};

    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return { message: 'Invalid credentials', error: 'Unauthorized', statusCode: 401 };
      } else {
        return { message: 'Failed to login', error: 'Internal Server Error', statusCode: 500 };
      }
    }
  }

}
