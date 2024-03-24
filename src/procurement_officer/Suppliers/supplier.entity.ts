// supplier.entity.ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PurchaseOrderEntity } from '../Purchase Orders/purchase-order.entity';

@Entity()
export class SupplierEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contactPerson: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @OneToMany(() => PurchaseOrderEntity, purchaseOrder => purchaseOrder.supplier)
  purchaseOrders: PurchaseOrderEntity[];
}
