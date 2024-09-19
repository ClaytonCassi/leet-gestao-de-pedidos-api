import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Product from './OrderProduct';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cliente: string;

  @Column('date')
  dataPedido: Date;

  @Column()
  celular: string;

  @OneToMany(() => Product, product => product.order, { eager: true, cascade: true })
  produtos: Product[];

  @Column()
  numeroArte: string;

  @Column('date')
  dataEvento: Date;

  @Column('decimal')
  valorFrete: number;

  @Column()
  cep: string;

  @Column()
  prazo: string;

  @Column()
  rua: string;

  @Column('decimal')
  valorTotal: number;

  @Column('varchar', { nullable: true })
  imagem: string;

  @Column('decimal')
  valorSinal: number;

  @Column('decimal')
  faltaPagar: number;

  @Column('date')
  dataEntrega: Date;

  @Column({ type: 'text', nullable: true })
  observacao?: string;

  @Column({ type: 'varchar', nullable: true })
  formaPagamento?: string;

  @Column({ type: 'varchar', nullable: true }) // Adicionar campo para número do pedido
  numeroPedido: string;

  @Column({ type: 'varchar', nullable: true }) // Adicionar campo para nome do vendedor
  nomeVendedor: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
