import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ProcurementOfficerEntity } from '../procurement_officer/procurement-officer.entity';

@Entity()
export class WarehouseStaffEntity {
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
  warehouseLocation: string;

  @Column()
  jobTitle: string;

  @OneToMany(() => ProcurementOfficerEntity, procurementOfficer => procurementOfficer.warehouseLocation)
  procurementOfficers: ProcurementOfficerEntity[];
}
