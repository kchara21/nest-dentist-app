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
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Appointment, (appointment) => appointment.result, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  appointments: Appointment[];

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
