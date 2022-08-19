import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards';
import { GetUser } from '../auth/decorators';
import { UserEntity } from '../users/entities';
import { UpdateProfileDto } from './dto';
import { ProfileEntity } from './entities/profile.entity';
import { ProfilesService } from './profiles.service';

@UseGuards(JwtGuard)
@Controller('profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  getProfile(@GetUser() user: UserEntity): Promise<ProfileEntity> {
    return this.profilesService.getProfile(user);
  }

  @Patch()
  updateProfile(
    @GetUser() user: UserEntity,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileEntity> {
    return this.profilesService.updateProfile(user, updateProfileDto);
  }
}
