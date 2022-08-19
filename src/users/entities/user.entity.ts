import { Exclude } from 'class-transformer';
import { CountryEntity } from 'src/countries/entities';
import { ProfileEntity } from 'src/profiles/entities/profile.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeUpdate,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profile: ProfileEntity;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  fullName: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToOne(() => CountryEntity, (country) => country.countryId, {
    nullable: true,
  })
  @JoinColumn({ name: 'countryId' })
  countryId: string;

  @BeforeUpdate()
  updateTimeStamp() {
    this.updatedAt = new Date();
  }

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
