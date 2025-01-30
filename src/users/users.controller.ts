import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { patchUserDto } from './dtos/patch-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    /**
     * Injecting users service
     */
    private readonly usersService: UsersService,
  ) {}

  @Get('/:id/profile')
  @UseInterceptors(ClassSerializerInterceptor)
  public async getUserProfile(@Param('id') userId: number) {
    return await this.usersService.getUserProfile(userId);
  }

  @Patch('/:id/profile')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateUserProfile(
    @Param('id') userId: number,
    @Body() patchUser: patchUserDto,
  ) {
    return await this.usersService.updateUserProfile(userId, patchUser);
  }
}
