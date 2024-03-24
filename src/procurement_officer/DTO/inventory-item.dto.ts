import { IsNotEmpty, IsInt, Min, IsNumber , Length } from 'class-validator';

export class InventoryItemDto {
    @IsNotEmpty()
    @Length(5, 50)
    itemName: string;

    @IsNotEmpty()
    @Length(5, 500)
    description: string;

    @IsInt()
    @Min(0)
    quantity: number;

    @IsNumber()
    @Min(0)
    unitPrice: number;
}
