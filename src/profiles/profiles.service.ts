import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async getProfileById(id: string, user: UserEntity): Promise<ProfileEntity> {
    const profile = await this.profileRepository.findOneBy({ id });

    if (!profile)
      throw new NotFoundException(`Profile with ID: ${id} not found`);

    return profile;
  }

  async createProfile(): Promise<ProfileEntity> {
    const profile = this.profileRepository.create();
    return this.profileRepository.save(profile);
  }

  async deleteProfile(id: string): Promise<void> {
    const result = await this.profileRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Profile with ID "${id}" not found`);
    }
  }
}
