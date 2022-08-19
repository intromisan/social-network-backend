import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dto';
import { UserEntity } from 'src/users/entities';
import { UsersService } from 'src/users/users.service';
import { AuthCredentialsDto } from './dto';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './interfaces';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userService: UsersService,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    return this.userService.createUser(createUserDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ access_token: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({ email });
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      return this.generateToken(user);
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  private async generateToken(user: UserEntity) {
    const { email } = user;
    const payload: JwtPayload = { email };
    const secret = this.config.get('JWT_SECRET');
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '1h',
        secret: secret,
      }),
    };
  }
}
