import ProductPrice from '@modules/product-prices/infra/typeorm/entities/ProductPrice';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';


@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  codigo: string;

  @Column()
  custo: string;

  @OneToMany(() => ProductPrice, productPrice => productPrice.product)
  prices: ProductPrice[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
