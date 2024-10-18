import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('order_tracking')
class OrderTracking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nomeVendedor: string;

  @Column()
  nomeFuncionarioArte: string;

  @Column()
  dataEnvio: Date;

  @Column()
  statusPagamento: string;

  @Column()
  nomeCliente: string;

  @Column({ nullable: true }) 
  celularCliente: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrderTracking;
