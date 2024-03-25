import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesRepresentativeEntity } from './sales-representative.entity';
import { SalesRepresentativeDto } from '../../dto/sales.dto';

@Injectable()
export class SalesRepresentativeService {
  constructor(
    @InjectRepository(SalesRepresentativeEntity)
    private salesRepresentativeRepository: Repository<SalesRepresentativeEntity>,
  ) {}

  async create(salesRepresentativeDto: SalesRepresentativeDto): Promise<SalesRepresentativeEntity> {
    return this.salesRepresentativeRepository.save(salesRepresentativeDto);
  }

  async findAll(): Promise<SalesRepresentativeEntity[]> {
    return this.salesRepresentativeRepository.find();
  }

  async findOne(id: number): Promise<SalesRepresentativeEntity> {
    const salesRepresentative = await this.salesRepresentativeRepository.findOne({ where: { id } });
    if (!salesRepresentative) {
      throw new NotFoundException('Sales Representative not found');
    }
    return salesRepresentative;
  }

  async update(id: number, salesRepresentativeDto: SalesRepresentativeDto): Promise<SalesRepresentativeEntity> {
    await this.findOne(id); // Ensure sales representative exists
    await this.salesRepresentativeRepository.update(id, salesRepresentativeDto);
    return this.findOne(id); // Return updated entity
  }

  async remove(id: number): Promise<void> {
    const result = await this.salesRepresentativeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Sales Representative not found');
    }
  }
}
