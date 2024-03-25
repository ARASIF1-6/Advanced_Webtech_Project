import { Controller, Post, Get, Param, Put, Delete, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { WarehouseStaffService } from './warehouse-staff.service';
import { WarehouseStaffDto } from '../../dto/warehouse.dto';
import { WarehouseStaffEntity } from './warehouse-staff.entity';

@Controller('api/warehousestaff')
export class WarehouseStaffController {
  constructor(private readonly warehouseStaffService: WarehouseStaffService) {}

  @Post()
  async create(@Body() warehouseStaffDto: WarehouseStaffDto): Promise<WarehouseStaffEntity> {
    return this.warehouseStaffService.create(warehouseStaffDto);
  }

  @Get()
  async findAll(): Promise<WarehouseStaffEntity[]> {
    return this.warehouseStaffService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<WarehouseStaffEntity> {
    return this.warehouseStaffService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: number, @Body() warehouseStaffDto: WarehouseStaffDto): Promise<WarehouseStaffEntity> {
    return this.warehouseStaffService.update(id, warehouseStaffDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async remove(@Param('id') id: number): Promise<void> {
    return this.warehouseStaffService.remove(id);
  }
}
