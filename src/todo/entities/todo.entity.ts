import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class ToDo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  description: string;
}