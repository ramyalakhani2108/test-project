import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateTaskChecklistsDto {
  @IsNumber()
  @IsNotEmpty()
  taskId: number;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  item: string;
}
