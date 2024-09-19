import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Product from '@modules/product/infra/typeorm/entities/Product';

@Entity('product_prices')
class ProductPrice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  faixa: string;

  @Column()
  quantidade_min: number;

  @Column({ type: 'int', nullable: true })
  quantidade_max: number | null;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @Column('float')
  height: number;

  @Column('float')
  width: number;

  @Column('float')
  depth: number;

  @Column('float')
  weight: number;

  @Column('float')
  volume: number;

  @Column('boolean')
  stackable: boolean;

  @Column('float', { nullable: true })
  stackingFactor: number;

  // Novas colunas de emparelhamento
  @Column('float', { nullable: true })
  pairing_height: number;

  @Column('float', { nullable: true })
  pairing_width: number;

  @Column('float', { nullable: true })
  pairing_depth: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ProductPrice;
