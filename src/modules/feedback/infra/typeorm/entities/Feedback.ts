import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('feedback')
class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  pergunta: string;

  @Column('text', { nullable: true })
  resposta: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Feedback;
