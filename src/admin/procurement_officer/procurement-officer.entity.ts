import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { WarehouseStaffEntity } from '../warehouse-staff/warehouse-staff.entity';

@Entity()
export class ProcurementOfficerEntity {
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
  department: string;

  @Column()
  supervisingManager: string;

  @ManyToOne(() => WarehouseStaffEntity, warehouseStaff => warehouseStaff.procurementOfficers)
  warehouseLocation: WarehouseStaffEntity;
}
