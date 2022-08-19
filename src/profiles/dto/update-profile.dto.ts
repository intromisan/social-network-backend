import { IsDate, IsNumber, IsString, IsUUID } from 'class-validator';
import { CountryDto } from 'src/countries/dto';

export class UpdateProfileDto {
  @IsString()
  profileImg: string;

  @IsString()
  description: string;

  @IsNumber()
  age: number;

  @IsString()
  occupation: string;

  @IsString()
  city: string;

  @IsUUID()
  countryId: string;

  @IsString()
  publicWebsite: string;

  @IsDate()
  birthDate: Date;
}
