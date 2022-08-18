import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards';
import { CountriesService } from './countries.service';
import { CountryEntity } from './entities';

@UseGuards(JwtGuard)
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  getCountries(): Promise<CountryEntity[]> {
    return this.countriesService.getCountries();
  }

  @Get(':id')
  getCountyById(@Param('id') id: string): Promise<CountryEntity> {
    return this.countriesService.getCountryById(id);
  }
}
