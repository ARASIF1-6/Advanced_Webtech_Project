import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarehouseStaffEntity } from './warehouse-staff.entity';
import { WarehouseStaffDto } from '../../dto/warehouse.dto';

@Injectable()
export class WarehouseStaffService {
  constructor(
    @InjectRepository(WarehouseStaffEntity)
    private warehouseStaffRepository: Repository<WarehouseStaffEntity>,
  ) {}

  async create(warehouseStaffDto: WarehouseStaffDto): Promise<WarehouseStaffEntity> {
    return this.warehouseStaffRepository.save(warehouseStaffDto);
  }

  async findAll(): Promise<WarehouseStaffEntity[]> {
    return this.warehouseStaffRepository.find();
  }

  async findOne(id: number): Promise<WarehouseStaffEntity> {
    const warehouseStaff = await this.warehouseStaffRepository.findOne({ where: { id } });
    if (!warehouseStaff) {
      throw new NotFoundException('Warehouse Staff member not found');
    }
    return warehouseStaff;
  }

  async update(id: number, warehouseStaffDto: WarehouseStaffDto): Promise<WarehouseStaffEntity> {
    await this.findOne(id); // Ensure warehouse staff member exists
    await this.warehouseStaffRepository.update(id, warehouseStaffDto);
    return this.findOne(id); // Return updated entity
  }

  async remove(id: number): Promise<void> {
    const result = await this.warehouseStaffRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Warehouse Staff member not found');
    }
  }
}
