import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('fare_requests')
export class FareRequestSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  passengerId: string;

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
}
