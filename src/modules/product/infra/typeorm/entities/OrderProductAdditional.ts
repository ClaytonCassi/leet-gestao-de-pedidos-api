import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import OrderProduct from '../../../../order/infra/typeorm/entities/OrderProduct';
  import Adicional from '../../../../additional/infra/typeorm/entities/Additional'; 
  
  @Entity('order_product_additionals')
  class OrderProductAdditional {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    orderProductId: string;
  
    @Column()
    adicionalId: string;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    valor: number | null;
  
   // OrderProductAdditional
    @ManyToOne(() => OrderProduct, orderProduct => orderProduct.adicionais, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'orderProductId' })
    orderProduct: OrderProduct;
  
    // Relação com a entidade Adicional
    @ManyToOne(() => Adicional)
    @JoinColumn({ name: 'adicionalId' })
    adicional: Adicional;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default OrderProductAdditional;
  