import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrderEntity } from './purchase-order.entity';
import { PurchaseOrderDto } from '../DTO/purchase-order.dto';

@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectRepository(PurchaseOrderEntity)
    private purchaseOrderRepository: Repository<PurchaseOrderEntity>,
  ) {}

  async getAllPurchaseOrders(): Promise<PurchaseOrderDto[]> {
    return this.purchaseOrderRepository.find();
  }

  async createPurchaseOrder(purchaseOrderDto: PurchaseOrderDto): Promise<PurchaseOrderDto> {
    const newPurchaseOrder = this.purchaseOrderRepository.create(purchaseOrderDto);
    return this.purchaseOrderRepository.save(newPurchaseOrder);
  }

  async getPurchaseOrderById(id: number): Promise<PurchaseOrderDto> {
    const purchaseOrder = await this.purchaseOrderRepository.findOne({ where: { id } });
    return purchaseOrder;
  }

  async updatePurchaseOrder(id: number, purchaseOrderDto: PurchaseOrderDto): Promise<PurchaseOrderDto> {
    await this.getPurchaseOrderById(id);
    await this.purchaseOrderRepository.update(id, purchaseOrderDto);
    return this.getPurchaseOrderById(id);
  }

  async deletePurchaseOrder(id: number): Promise<void> {
    const result = await this.purchaseOrderRepository.delete(id);

  }

  async getPurchaseOrderWithSupplier(id: number) {
    return this.purchaseOrderRepository.findOne({ 
      where: { id }, 
      relations: ['supplier'] 
    });
  }
  
}
