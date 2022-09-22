import { Appointment } from '../../appointments/entities/appointment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Appointment, (organization) => organization.categories, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  appointment: Appointment;

  @Column()
  name: string;

  @Column()
  @CreateDateColumn()
  create_at: Date;

  @Column()
  @UpdateDateColumn()
  update_at: Date;
}
