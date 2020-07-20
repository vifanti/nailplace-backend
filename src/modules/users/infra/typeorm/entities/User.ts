import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// Quando coloca o decorator em cima da classe elee envia a classe como parâmetro para a entidade

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  phone_number: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  // @Column()
  // avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
