import { Controller, Post, Get, Param, Put, Delete, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { SalesRepresentativeService } from './sales-representative.service';
import { SalesRepresentativeDto } from '../../dto/sales.dto';
import { SalesRepresentativeEntity } from './sales-representative.entity';

@Controller('api/salesrepresentative')
export class SalesRepresentativeController {
  constructor(private readonly salesRepresentativeService: SalesRepresentativeService) {}

  @Post()
  async create(@Body() salesRepresentativeDto: SalesRepresentativeDto): Promise<SalesRepresentativeEntity> {
    return this.salesRepresentativeService.create(salesRepresentativeDto);
  }

  @Get()
  async findAll(): Promise<SalesRepresentativeEntity[]> {
    return this.salesRepresentativeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SalesRepresentativeEntity> {
    return this.salesRepresentativeService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: number, @Body() salesRepresentativeDto: SalesRepresentativeDto): Promise<SalesRepresentativeEntity> {
    return this.salesRepresentativeService.update(id, salesRepresentativeDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async remove(@Param('id') id: number): Promise<void> {
    return this.salesRepresentativeService.remove(id);
  }
}
