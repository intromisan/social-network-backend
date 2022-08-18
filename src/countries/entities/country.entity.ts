import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('countries')
export class CountryEntity {
  @PrimaryGeneratedColumn('uuid')
  countryId: string;

  @Column()
  countryName: string;
}
