import { IsNotEmpty, IsString, IsEmail, IsDateString, Length, IsNumber } from 'class-validator';

export class SalesRepresentativeDto {
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
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(11)
    phone: string;

    @IsDateString()
    joinDate: Date;

    @IsNotEmpty()
    @IsNumber()
    salary: number;

    @IsNotEmpty()
    @IsString()
    @Length(2, 50)
    territory: string;


    @IsNotEmpty()
    @IsString()
    @Length(2, 50)
    salesRegion: string;

    
}
