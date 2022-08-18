import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CountryDto {
  @IsNotEmpty()
  @IsUUID()
  countryId: string;

  @IsNotEmpty()
  @IsString()
  countryName: string;
}
