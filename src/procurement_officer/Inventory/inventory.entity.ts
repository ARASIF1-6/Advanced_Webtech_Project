import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PurchaseOrderEntity } from '../Purchase Orders/purchase-order.entity';

@Entity()
export class InventoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemName: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  unitPrice: number;

  @ManyToMany(() => PurchaseOrderEntity, purchaseOrder => purchaseOrder.inventoryItems)
  purchaseOrders: PurchaseOrderEntity[];
}
