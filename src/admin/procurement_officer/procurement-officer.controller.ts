import { Controller, Post, Get, Param, Put, Delete, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProcurementOfficerService } from './procurement-officer.service';
import { ProcurementOfficerDto } from '../../dto/procurementofficer.dto';
import { ProcurementOfficerEntity } from './procurement-officer.entity';

@Controller('api/procurement')
export class ProcurementOfficerController {
  constructor(private readonly procurementOfficerService: ProcurementOfficerService) {}

  @Post()
  async create(@Body() procurementOfficerDto: ProcurementOfficerDto): Promise<ProcurementOfficerEntity> {
    return this.procurementOfficerService.create(procurementOfficerDto);
  }

  @Get('getall')
  async findAll(): Promise<ProcurementOfficerEntity[]> {
    return this.procurementOfficerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProcurementOfficerEntity> {
    return this.procurementOfficerService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: number, @Body() procurementOfficerDto: ProcurementOfficerDto): Promise<ProcurementOfficerEntity> {
    return this.procurementOfficerService.update(id, procurementOfficerDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async remove(@Param('id') id: number): Promise<void> {
    return this.procurementOfficerService.remove(id);
  }
}
