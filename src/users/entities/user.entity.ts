import { Appointment } from '../../appointments/entities/appointment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Appointment, (appointment) => appointment.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  appointment: Appointment[];

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  ci: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  @CreateDateColumn()
  create_at: Date;

  @Column()
  @UpdateDateColumn()
  update_at: Date;
}
