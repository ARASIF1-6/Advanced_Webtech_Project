import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { SupplierEntity } from '../Suppliers/supplier.entity';
import { InventoryEntity } from '../Inventory/inventory.entity';

@Entity()
export class PurchaseOrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderNumber: string;

  @Column()
  supplierId: number;

  @Column()
  status: string;

  @Column()
  totalAmount: number;

  @Column()
  orderDate: Date;

  @Column()
  deliveryDate: Date;
  
  @ManyToOne(() => SupplierEntity, supplier => supplier.purchaseOrders)
  supplier: SupplierEntity;

  @ManyToMany(() => InventoryEntity)
  @JoinTable()
  inventoryItems: InventoryEntity[];
}
