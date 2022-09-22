import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: number;

  @Column()
  @CreateDateColumn()
  create_at: Date;

  @Column()
  @UpdateDateColumn()
  update_at: Date;
}
