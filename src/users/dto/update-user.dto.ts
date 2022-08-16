import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;
}
