import { Injectable } from '@nestjs/common';
import { NewUserDto } from 'src/users/dtos/new-user.dto';
import { UsersService } from 'src/users/providers/users.service';
import { SignInUserDto } from '../dots/signin-user.dto';

@Injectable()
export class AuthService {
  constructor(
    /**
     * Injecting users service
     */
    private readonly usersService: UsersService,
  ) {}

  public async registerUser(user: NewUserDto) {
    return await this.usersService.createUser(user);
  }

  public async loginUser(user: SignInUserDto) {
    return await this.usersService.loginUser(user);
  }
}
