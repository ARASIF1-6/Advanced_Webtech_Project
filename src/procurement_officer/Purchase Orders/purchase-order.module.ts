import { Module } from "@nestjs/common";
import { PurchaseOrderController } from "./purchase-order.controller";
import { PurchaseOrderService } from "./purchase-order.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchaseOrderEntity } from "./purchase-order.entity";


@Module({
    imports: [TypeOrmModule.forFeature([PurchaseOrderEntity])],
    controllers: [PurchaseOrderController],
    providers: [PurchaseOrderService],
  })
  export class PurchaseOrderModule {}
  