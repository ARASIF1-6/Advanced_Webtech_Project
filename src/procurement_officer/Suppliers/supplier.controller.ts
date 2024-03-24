import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { SupplierDto } from '../DTO/supplier.dto';
import { SupplierService } from './supplier.service';

@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  async getAllSuppliers(): Promise<SupplierDto[]> {
    try {
      return await this.supplierService.getAllSuppliers();
    } catch (error) {
      throw new HttpException('Error fetching suppliers', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getSupplierById(@Param('id') id: number): Promise<SupplierDto> {
    try {
      return await this.supplierService.getSupplierById(id);
    } catch (error) {
      throw new HttpException(`Supplier with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createSupplier(@Body() supplierDto: SupplierDto): Promise<SupplierDto> {
    try {
      return await this.supplierService.createSupplier(supplierDto);
    } catch (error) {
      throw new HttpException('Error creating supplier', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateSupplier(@Param('id') id: number, @Body() supplierDto: SupplierDto): Promise<SupplierDto> {
    try {
      return await this.supplierService.updateSupplier(id, supplierDto);
    } catch (error) {
      throw new HttpException(`Error updating supplier with id ${id}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteSupplier(@Param('id') id: number): Promise<void> {
    try {
      await this.supplierService.deleteSupplier(id);
    } catch (error) {
      throw new HttpException(`Error deleting supplier with id ${id}`, HttpStatus.BAD_REQUEST);
    }
  }
}