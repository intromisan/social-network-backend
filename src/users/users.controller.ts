import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserEntity } from './entities';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string): Promise<void> {
    return this.userService.removeUser(id);
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.getUserById(id);
  }

  @Get()
  getUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUsers();
  }
}
