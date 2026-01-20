import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('drivers')
export class DriverSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  birthDate: Date;

  @Column()
  gender: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;
}
