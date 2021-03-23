import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import Provider from './Provider';
import Service from './Service';

@Entity('provides_services')
class ProvidesServices {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider_id' })
  providers: Provider[];

  @Column()
  service_id: number;

  @OneToOne(() => Service)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ProvidesServices;
