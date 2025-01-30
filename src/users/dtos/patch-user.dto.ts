import { PartialType } from '@nestjs/mapped-types';
import { NewUserDto } from './new-user.dto';

export class patchUserDto extends PartialType(NewUserDto) {}
