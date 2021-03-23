import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import ProvidesServices from '@modules/providers/infra/typeorm/entities/ProvidesServices';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('providers')
class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @OneToMany(
    () => ProvidesServices,
    providesServices => providesServices.providers,
    // {
    //   cascade: true,
    //   eager: true,
    // },
  )
  providesServices: ProvidesServices[];

  @OneToOne(() => User, user => user.provider)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Provider;
