import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserParams, RegisterUserParams } from 'src/utils/type';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}


  async registerUser(userDetails: RegisterUserParams) {
    const { username } = userDetails;
  
    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new Error('Username already exists');
    }
  
    console.log(userDetails);
    const newUser = this.userRepository.create({ ...userDetails });
    return this.userRepository.save(newUser);
  }


  async loginUser(credentials: LoginUserParams) {
    const { username, password } = credentials;

    const user = await this.userRepository.findOne({ where: { username } });


    if (user && user.password === password) {

      const token = jwt.sign({ userId: user.id, username: user.username }, '', { expiresIn: '1h' });

  
      return { user, token };
    } else {
  
      throw new UnauthorizedException('Invalid credentials');
    }
  }
   
}
