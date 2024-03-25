import { IsNotEmpty, IsString, IsNumber, IsDateString, Length } from 'class-validator';

export class ProcurementOfficerDto {
    @IsNotEmpty()
    @IsString()
    @Length(2, 50)
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 20)
    password: string;

    @IsNotEmpty()
    @IsString()
    @Length(10, 100)
    address: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 50)
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 50)
    supervisingManager: string;
    
    @IsNotEmpty()
    @IsString()
    @Length(11)
    phone: string;

    @IsDateString()
    joinDate: Date;

    @IsNotEmpty()
    @IsNumber()
    salary: number;


}
