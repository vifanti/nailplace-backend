import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import Provider from '@modules/providers/infra/typeorm/entities/Provider';
import Service from '@modules/providers/infra/typeorm/entities/Service';

@Entity('providers_services')
class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'order_id' })
  order: Provider;

  @ManyToOne(() => Service)
  @JoinColumn({ name: 'product_id' })
  product: Service;

  @Column()
  product_id: string;

  @Column()
  order_id: string;

  @Column({
    type: 'decimal',
    precision: 13,
    scale: 2,
  })
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersProducts;
