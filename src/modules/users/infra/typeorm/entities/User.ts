import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import uploadConfig from '@config/upload';

import { Exclude, Expose } from 'class-transformer/decorators';

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
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return encodeURI(`${process.env.APP_API_URL}/files/${this.avatar}`);
      case 's3':
        return encodeURI(
          `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`,
        );
      default:
        return null;
    }
  }
}

export default User;
