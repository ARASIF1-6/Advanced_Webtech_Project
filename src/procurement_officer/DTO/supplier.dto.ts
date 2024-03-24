import { IsNotEmpty, IsInt, IsEmail, Length } from 'class-validator';

export class SupplierDto {
    @IsInt()
    id: number;

    @IsNotEmpty()
    @Length(1, 100)
    name: string;

    @IsNotEmpty()
    @Length(1, 100)
    contactPerson: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(1, 20)
    phoneNumber: string;

    @IsNotEmpty()
    @Length(1, 100)
    address: string;
}
