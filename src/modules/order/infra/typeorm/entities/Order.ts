import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Product from './OrderProduct';
import GraduationCommission from '../../../../../modules/graduation-commission/infra/typeorm/entities/GraduationCommission';


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

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    default: 'não confirmado', 
  })
  pagamentoVerificado?: 'não confirmado' | 'confirmado 50%' | 'confirmado 100%' | null;

  @Column({ type: 'text', nullable: true })
  observacao?: string;

  @Column({ type: 'varchar', nullable: true })
  formaPagamento?: string;

  @Column({ type: 'varchar', nullable: true })
  numeroPedido: string;

  @Column({ type: 'varchar', nullable: true })
  nomeVendedor: string;

  @Column({ type: 'varchar', nullable: true })
  nomeDesigner: string;


  @ManyToOne(() => GraduationCommission)
  @JoinColumn({ name: 'comissao_formatura_id' })
  comissaoFormatura: GraduationCommission;

  @Column({ type: 'uuid', nullable: true, name: 'comissao_formatura_id' }) 
  comissaoFormaturaId?: string;

  @Column({ type: 'varchar', nullable: true, name: 'tipo_desconto' }) 
  tipoDesconto: 'CUPOM_FORMANDO_15' | 'CUPOM_COMISSAO_35' | null;

  @Column({ type: 'varchar', nullable: true, name: 'padrao_desconto' }) 
  padraoDesconto: string;

    // New fields
  @Column({ type: 'varchar', nullable: true })
  status?: string;
  
  @Column({ type: 'varchar', nullable: true })
  setor?: string;
  
  @Column({ type: 'varchar', nullable: true })
  qrcode?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
