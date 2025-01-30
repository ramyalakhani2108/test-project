import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { NewUserDto } from 'src/users/dtos/new-user.dto';
import { SignInUserDto } from './dots/signin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    /**
     * Injecting auth service
     */
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  public async registerUser(@Body() user: NewUserDto) {
    return await this.authService.registerUser(user);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  public async loginUser(@Body() user: SignInUserDto) {
    return await this.authService.loginUser(user);
  }
}
