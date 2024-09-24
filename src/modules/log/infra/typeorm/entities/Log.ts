// src/modules/log/infra/typeorm/entities/Log.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('logs')
class Log {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  module: string;

  @Column()
  event: string;

  @Column({ type: 'json', nullable: true })
  data: any;

  @Column()
  user_name: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Log;
