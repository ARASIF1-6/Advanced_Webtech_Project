import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { PurchaseOrderDto } from '../DTO/purchase-order.dto';

@Controller('purchase-orders')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}

  @Get()
  async getAllPurchaseOrders(): Promise<PurchaseOrderDto[]> {
    try {
      return await this.purchaseOrderService.getAllPurchaseOrders();
    } catch (error) {
      throw new HttpException('Error fetching purchase orders', HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createPurchaseOrder(@Body() purchaseOrderDto: PurchaseOrderDto): Promise<PurchaseOrderDto> {
    try {
      return await this.purchaseOrderService.createPurchaseOrder(purchaseOrderDto);
    } catch (error) {
      throw new HttpException('Error creating purchase order', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getPurchaseOrderById(@Param('id') id: number): Promise<PurchaseOrderDto> {
    try {
      return await this.purchaseOrderService.getPurchaseOrderById(id);
    } catch (error) {
      throw new HttpException(`Purchase order with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updatePurchaseOrder(@Param('id') id: number, @Body() purchaseOrderDto: PurchaseOrderDto): Promise<PurchaseOrderDto> {
    try {
      return await this.purchaseOrderService.updatePurchaseOrder(id, purchaseOrderDto);
    } catch (error) {
      throw new HttpException(`Error updating purchase order with id ${id}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deletePurchaseOrder(@Param('id') id: number): Promise<void> {
    try {
      await this.purchaseOrderService.deletePurchaseOrder(id);
    } catch (error) {
      throw new HttpException(`Error deleting purchase order with id ${id}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getbysupplierid/:id')
  async getPurchaseOrder(@Param('id') id: number) {
    try {
      return await this.purchaseOrderService.getPurchaseOrderWithSupplier(id);
    } catch (error) {
      throw new HttpException(`Error fetching purchase order with supplier id ${id}`, HttpStatus.BAD_REQUEST);
    }
  }
}