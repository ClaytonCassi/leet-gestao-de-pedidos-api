import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Order from './Order';
import Product from '../../../../product/infra/typeorm/entities/Product';
import OrderProductAdditional from '../../../../product/infra/typeorm/entities/OrderProductAdditional'; 

@Entity('order_products')
class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @Column()
  productId: string;

  // Relação com a entidade Order
  @ManyToOne(() => Order, order => order.produtos)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  // Relação com a entidade Product
  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  // Relação com a entidade OrderProductAdditional
  @OneToMany(() => OrderProductAdditional, opa => opa.orderProduct, { cascade: ['insert', 'update', 'remove'], eager: false })
  adicionais?: OrderProductAdditional[];

  @Column('int')
  quantidade: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valorUnitario: number;

  @Column()
  nome: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrderProduct;
