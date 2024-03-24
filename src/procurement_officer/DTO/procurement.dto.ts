import { IsNotEmpty, IsInt, Length, IsEmail } from 'class-validator';

export class ProcurementDTO {
    @IsInt()
    id: number;

    @IsNotEmpty()
    @Length(5, 50)
    name: string;

    @IsNotEmpty()
    @Length(6, 20)
    password: string;

    @IsNotEmpty()
    @Length(11)
    phone: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(1, 200)
    address: string;

    profilePicture: string;
}
export class LoginDTO{
    @IsEmail() email: string;
    @IsNotEmpty() password: string;    
}
