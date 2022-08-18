import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity } from './entities';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
  ) {}

  async getCountries(): Promise<CountryEntity[]> {
    return await this.countryRepository.find();
  }

  async getCountryById(id: string): Promise<CountryEntity> {
    const country = await this.countryRepository.findOne({
      where: { countryId: id },
    });

    if (!country)
      throw new NotFoundException(`Country with ID: ${id} not found`);

    return country;
  }
}
