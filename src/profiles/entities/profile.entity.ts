import { CountryEntity } from 'src/countries/entities';
import { UserEntity } from 'src/users/entities';
import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('profiles')
export class ProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  profileImg: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  occupation: string;

  @Column({ nullable: true })
  city: string;

  @ManyToOne(() => CountryEntity, (country) => country.countryId, {
    nullable: true,
  })
  @JoinColumn({ name: 'countryId' })
  countryId: string;

  @Column({ nullable: true })
  publicWebsite: string;

  @Column({ nullable: true })
  birthDate: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
