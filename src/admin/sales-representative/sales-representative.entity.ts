import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SalesRepresentativeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'date' })
  joinDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salary: number;

  @Column()
  territory: string;

  @Column()
  salesRegion: string;
}
