import { Category } from '../../categories/entities/category.entity';
import { Result } from '../../results/entities/result.entity';
import { User } from '../../users/entities/user.entity';
import { Invoice } from '../../invoices/entities/invoice.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Invoice)
  @JoinColumn()
  invoice: Invoice;

  @OneToMany(() => Category, (category) => category.appointment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  categories: Category[];

  @ManyToOne(() => Result, (result) => result.appointments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  result: Result;

  @ManyToOne(() => User, (user) => user.appointment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  user: User;

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
