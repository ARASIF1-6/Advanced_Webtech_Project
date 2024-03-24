import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryEntity } from './inventory.entity';
import { InventoryItemDto } from '../DTO/inventory-item.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
  ) {}

  async getAllItems(): Promise<InventoryItemDto[]> {
    const items = await this.inventoryRepository.find();
    return items;
  }

  async getItemById(id: number): Promise<InventoryItemDto> {
    const item = await this.inventoryRepository.findOne({where: {id}});
    return item;
  }

  async addItem(itemDto: InventoryItemDto): Promise<InventoryItemDto> {
    const item = await this.inventoryRepository.save(itemDto);
    return item;
  }

  async updateItem(id: number, itemDto: InventoryItemDto): Promise<InventoryItemDto> {
    await this.inventoryRepository.update(id, itemDto);
    return this.getItemById(id);
  }

  async deleteItem(id: number): Promise<void> {
    await this.inventoryRepository.delete(id);
  }


}
