// supplier.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierEntity } from './supplier.entity';
import { SupplierDto } from '../DTO/supplier.dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(SupplierEntity)
    private supplierRepository: Repository<SupplierEntity>,
  ) {}

  async getAllSuppliers(): Promise<SupplierDto[]> {
    const suppliers = await this.supplierRepository.find();
    return suppliers;
  }

  async getSupplierById(id: number): Promise<SupplierDto> {
    const supplier = await this.supplierRepository.findOne({ where: { id } });
    return supplier;
  }

  async createSupplier(supplierDto: SupplierDto): Promise<SupplierDto> {
    const supplier = await this.supplierRepository.save(supplierDto);
    return supplier;
  }

  async updateSupplier(id: number, supplierDto: SupplierDto): Promise<SupplierDto> {
    await this.supplierRepository.update(id, supplierDto);
    return this.getSupplierById(id);
  }

  async deleteSupplier(id: number): Promise<void> {
    await this.supplierRepository.delete(id);
  }


}
