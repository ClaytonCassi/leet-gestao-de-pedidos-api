import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import GraduationCommission from './GraduationCommission';
  
  @Entity('integrantes')
  class Integrante {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    nome: string;
  
    @Column()
    telefone: string;
  
    @Column()
    cpf: string;
  
    @Column({ nullable: true })
    instagram: string;

     // Alinhando o nome da propriedade com o banco
  @Column({ name: 'graduation_commission_id' }) 
  graduationCommissionId: string;
  
    @ManyToOne(() => GraduationCommission, (commission) => commission.integrantes)
    @JoinColumn({ name: 'graduation_commission_id' }) // Alinha com o nome da coluna na migração
    graduationCommission: GraduationCommission;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default Integrante;
  