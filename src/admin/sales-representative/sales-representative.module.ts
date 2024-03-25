import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesRepresentativeController } from './sales-representative.controller';
import { SalesRepresentativeService } from './sales-representative.service';
import { SalesRepresentativeEntity } from './sales-representative.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalesRepresentativeEntity])],
  controllers: [SalesRepresentativeController],
  providers: [SalesRepresentativeService],
})
export class SalesRepresentativeModule {}
