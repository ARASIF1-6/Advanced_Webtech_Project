import { Module } from "@nestjs/common";

import { ProcurementController } from "./procurement.controller";
import { ProcurementService } from "./procurement.services";
import { ProcurementEntity } from "./procurement.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./Auth/auth.service";

@Module({

    imports: [TypeOrmModule.forFeature([ProcurementEntity])],

    controllers: [ProcurementController],

    providers: [ProcurementService,AuthService],
    
    exports: [ProcurementService],
  })

  export class ProcurementModule {}