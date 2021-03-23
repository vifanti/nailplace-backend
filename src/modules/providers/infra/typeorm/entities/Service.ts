import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import ProvidesServices from './ProvidesServices';

// Quando coloca o decorator em cima da classe elee envia a classe como parâmetro para a entidade

@Entity('services')
class Services {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  image_url: string;

  @OneToOne(
    () => ProvidesServices,
    providesServices => providesServices.service,
  ) // specify inverse side as a second parameter
  providesService: ProvidesServices;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Services;
