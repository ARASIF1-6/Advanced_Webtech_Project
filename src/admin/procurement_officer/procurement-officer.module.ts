import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcurementOfficerController } from './procurement-officer.controller';
import { ProcurementOfficerService } from './procurement-officer.service';
import { ProcurementOfficerEntity } from './procurement-officer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProcurementOfficerEntity])],
  controllers: [ProcurementOfficerController],
  providers: [ProcurementOfficerService],
})
export class ProcurementOfficerModule {}
