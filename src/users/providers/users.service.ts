import {
  BadRequestException,
  ClassSerializerInterceptor,
  Injectable,
  RequestTimeoutException,
  UseInterceptors,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { NewUserDto } from '../dtos/new-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from './hashing.provider';
import { SignInUserDto } from 'src/auth/dots/signin-user.dto';
import { patchUserDto } from '../dtos/patch-user.dto';

@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting users repository
     */
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,

    private readonly hashProvider: HashingProvider,
  ) {}

  public async createUser(userDto: NewUserDto) {
    let user: User | null = null;
    try {
      user = await this.usersRepo.findOneBy({ email: userDto.email });
    } catch (error) {
      throw new RequestTimeoutException('Something went wrong', {
        cause: error,
      });
    }

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const newUser = this.usersRepo.create({
      ...userDto,
      password: await this.hashProvider.hashPassword(userDto.password),
    });
    console.log(newUser);
    try {
      await this.usersRepo.save(newUser);
    } catch (err) {
      console.log(err);
      throw new RequestTimeoutException('Error creating user');
    }

    return newUser;
  }

  public async loginUser(user: SignInUserDto) {
    let foundUser: User | null = null;
    try {
      foundUser = await this.usersRepo.findOneBy({ email: user.email });
    } catch (error) {
      throw new RequestTimeoutException('Something went wrong', {
        cause: error,
      });
    }

    if (!foundUser) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await this.hashProvider.comparePassword(
      user.password,
      foundUser.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    return foundUser;
  }

  public async getUserProfile(id: number) {
    let user: User | null = null;
    try {
      user = await this.usersRepo.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException('Something went wrong', {
        cause: error,
      });
    }

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  public async updateUserProfile(
    id: number,
    userDto: patchUserDto,
  ): Promise<User> {
    let user: User | null = null;
    try {
      user = await this.usersRepo.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException('Something went wrong', {
        cause: error,
      });
    }

    if (!user) {
      throw new BadRequestException('User not found');
    }

    user.firstName = userDto.firstName ?? user.firstName;
    user.lastName = userDto.lastName ?? user.lastName;
    user.email = userDto.email ?? user.email;
    user.password = userDto.password
      ? await this.hashProvider.hashPassword(userDto.password)
      : user.password;
    user.role = userDto.role ?? user.role;

    try {
      await this.usersRepo.save(user);
    } catch (error) {
      throw new RequestTimeoutException('Something went wrong', {
        cause: error,
      });
    }

    return user;
  }
}
