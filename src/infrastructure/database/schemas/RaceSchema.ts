import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('races')
export class RaceSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  passengerId: string;

  @Column()
  driverId: string;

  @Column('float')
  originLat: number;

  @Column('float')
  originLng: number;

  @Column('float')
  destinationLat: number;

  @Column('float')
  destinationLng: number;

  @Column()
  date: Date;

  @Column('float')
  distanceMeters: number;

  @Column('float')
  price: number;
}
