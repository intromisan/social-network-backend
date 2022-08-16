import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserEntity } from './entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    try {
      await this.userRepository.save({ ...createUserDto });
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email address already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with ID: ${id} not found`);

    return user;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async removeUser(id: string): Promise<void> {
    Logger.log(id);
    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const user = await this.getUserById(id);
    try {
      await this.userRepository.update({ id: user.id }, { ...updateUserDto });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}