import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { InventoryItemDto } from '../DTO/inventory-item.dto';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  async getAllItems(): Promise<InventoryItemDto[]> {
    try {
      return await this.inventoryService.getAllItems();
    } catch (error) {
      throw new HttpException('Error fetching items', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getItemById(@Param('id') id: number): Promise<InventoryItemDto> {
    try {
      return await this.inventoryService.getItemById(id);
    } catch (error) {
      throw new HttpException(`Item with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async addItem(@Body() itemDto: InventoryItemDto): Promise<InventoryItemDto> {
    try {
      return await this.inventoryService.addItem(itemDto);
    } catch (error) {
      throw new HttpException('Error adding item', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateItem(@Param('id') id: number, @Body() itemDto: InventoryItemDto): Promise<InventoryItemDto> {
    try {
      return await this.inventoryService.updateItem(id, itemDto);
    } catch (error) {
      throw new HttpException(`Error updating item with id ${id}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: number): Promise<void> {
    try {
      await this.inventoryService.deleteItem(id);
    } catch (error) {
      throw new HttpException(`Error deleting item with id ${id}`, HttpStatus.BAD_REQUEST);
    }
  }
}