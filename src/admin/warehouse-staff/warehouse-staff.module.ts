import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseStaffController } from './warehouse-staff.controller';
import { WarehouseStaffService } from './warehouse-staff.service';
import { WarehouseStaffEntity } from './warehouse-staff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WarehouseStaffEntity])],
  controllers: [WarehouseStaffController],
  providers: [WarehouseStaffService],
})
export class WarehouseStaffModule {}
