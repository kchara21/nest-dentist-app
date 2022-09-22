import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  state: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column()
  @CreateDateColumn()
  create_at: Date;

  @Column()
  @UpdateDateColumn()
  update_at: Date;
}
