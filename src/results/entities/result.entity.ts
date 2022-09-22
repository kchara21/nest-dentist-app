import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  detail: string;

  @Column()
  image: string;

  @Column()
  observation: string;

  @Column()
  recomendation: string;

  @Column()
  @CreateDateColumn()
  create_at: Date;

  @Column()
  @UpdateDateColumn()
  update_at: Date;
}
