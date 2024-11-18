// src/modules/graduationCommission/infra/typeorm/entities/GraduationCommission.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import Integrante from './Integrante';

@Entity('graduation_commissions')
class GraduationCommission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cupom: string;

  @Column()
  nomeCurso: string;

  @Column('date')
  dataEvento: Date;

  @Column()
  quantidadeIntegrantes: number;

  @Column()
  quantidadeFormandos: number;

  @Column()
  quantidadePedido: number;

  @Column()
  vendedor: string;

  @Column()
  estado: string;

  @Column()
  cep: string;

  @Column()
  nomeResponsavel: string;

  @Column()
  contatoResponsavel: string;

  @Column({ nullable: true })
  documentoAssinaturaUrl: string;

  @OneToMany(() => Integrante, (integrante) => integrante.graduationCommission, {
    cascade: true,
  })
  integrantes: Integrante[];

  @Column({ default: 0 })
  quantidadeCuponsAtivados: number;

  @Column({ default: 0 })
  quantidadePedidosRealizados: number;

  @Column({ default: 0 })
  quantidadeEmAtendimento: number;

  @Column({ default: 0 })
  quantidadeEmFaseDaArte: number;

  @Column({ nullable: true })
  observacao: string;
}

export default GraduationCommission;
