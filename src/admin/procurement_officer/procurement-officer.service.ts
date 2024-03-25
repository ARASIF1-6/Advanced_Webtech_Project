import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcurementOfficerEntity } from './procurement-officer.entity';
import { ProcurementOfficerDto } from '../../dto/procurementofficer.dto';

@Injectable()
export class ProcurementOfficerService {
  constructor(
    @InjectRepository(ProcurementOfficerEntity)
    private procurementOfficerRepository: Repository<ProcurementOfficerEntity>,
  ) {}

  async create(procurementOfficerDto: ProcurementOfficerDto): Promise<ProcurementOfficerEntity> {
    return this.procurementOfficerRepository.save(procurementOfficerDto);
  }

  async findAll(): Promise<ProcurementOfficerEntity[]> {
    return this.procurementOfficerRepository.find();
  }

  async findOne(id: number): Promise<ProcurementOfficerEntity> {
    const procurementOfficer = await this.procurementOfficerRepository.findOne({ where: { id } });
    if (!procurementOfficer) {
      throw new NotFoundException('Procurement Officer not found');
    }
    return procurementOfficer;
  }

  async update(id: number, procurementOfficerDto: ProcurementOfficerDto): Promise<ProcurementOfficerEntity> {
    await this.findOne(id); // Ensure procurement officer exists
    await this.procurementOfficerRepository.update(id, procurementOfficerDto);
    return this.findOne(id); // Return updated entity
  }

  async remove(id: number): Promise<void> {
    const result = await this.procurementOfficerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Procurement Officer not found');
    }
  }
}
