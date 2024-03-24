import { IsNotEmpty, IsInt, Length, IsDateString, IsNumber } from 'class-validator';

export class PurchaseOrderDto {
    @IsNotEmpty()
    @Length(1, 50)
    orderNumber: string;

    @IsInt()
    supplierId: number;

    @IsNotEmpty()
    status: string;

    @IsNumber()
    totalAmount: number;

    @IsDateString()
    orderDate: Date;

    @IsDateString()
    deliveryDate: Date;
}
