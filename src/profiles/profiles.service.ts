import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getProfile(user: UserEntity): Promise<ProfileEntity> {
    const userWithProfile = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['profile'],
    });
    return userWithProfile.profile;
  }

  async createProfile(): Promise<ProfileEntity> {
    const profile = this.profileRepository.create();
    return this.profileRepository.save(profile);
  }

  async deleteProfile(user: UserEntity): Promise<void> {
    const profile = await this.getProfile(user);
    const result = await this.profileRepository.delete(profile.id);
    if (result.affected === 0) {
      throw new NotFoundException(`Profile with ID "${profile.id}" not found`);
    }
  }

  async updateProfile(
    user: UserEntity,
    updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileEntity> {
    const profile = await this.getProfile(user);
    const updatedProfile = { ...profile, ...updateProfileDto };

    await this.profileRepository.save(updatedProfile);
    return updatedProfile;
  }
}
