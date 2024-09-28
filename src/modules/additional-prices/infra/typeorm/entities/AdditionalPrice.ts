import Additional from '../../../../../modules/additional/infra/typeorm/entities/Additional';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';


@Entity('additional_prices')
class AdditionalPrice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  additional_id: string;

  @ManyToOne(() => Additional)
  @JoinColumn({ name: 'additional_id' })
  additional: Additional;

  @Column()
  faixa: string;

  @Column()
  quantidade_min: number;

  @Column({ type: 'int', nullable: true })
  quantidade_max: number | null;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AdditionalPrice;
