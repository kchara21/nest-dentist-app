import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reason: string;

  @Column()
  observation: string;

  @Column()
  recomendation: string;

  @Column()
  date: Date;

  @Column()
  duration: number;

  @Column()
  @CreateDateColumn()
  create_at: Date;

  @Column()
  @UpdateDateColumn()
  update_at: Date;
}
