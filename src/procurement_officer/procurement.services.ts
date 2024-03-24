import { Injectable } from "@nestjs/common";
import { ProcurementDTO } from "./DTO/procurement.dto";
import { ProcurementEntity } from "./procurement.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ProcurementService{
constructor(@InjectRepository(ProcurementEntity) private procurementRepository: Repository<ProcurementEntity>){}  

    
    profile: ProcurementDTO= {
    id:23,
    password:'asdfasd',
    phone:'0170000000',
    address:'zyx street',
    name: 'John Doe',
    profilePicture:'xyz.jpg',
    email: 'john.doe@example.com',
    
    };

    viewProfile() {
    return this.profile;
    }

    async updateUser(updatedUserInfo:ProcurementDTO):Promise<ProcurementDTO>{
        return updatedUserInfo;
    }

    async addProcurementOfficer(procurementOfficerData: ProcurementDTO): Promise<ProcurementDTO> {
        const procurementOfficer = this.procurementRepository.create(procurementOfficerData);
        return await this.procurementRepository.save(procurementOfficer);
      }
    
      async findOneByEmail(email: string): Promise<ProcurementEntity> {
        return this.procurementRepository.findOne({ where: { email } });
      }
      
    //Old lab Task
    // getUsersById(id: string): object {
    //     return {massage: "Your id is" + id};
        
    // }
    // getUsersByNameAndId(name: string, id: string): object{
    //     return {message: "You id is " + name +
    //      " and your id is " + id};
    
    // }

    // async createUser(user: ProcurementEntity): Promise<ProcurementEntity> {
    //     return await this.procurementRepository.save(user);
    // }

    // async removeUserById(userId: number): Promise<void> {
    //     await this.procurementRepository.delete(userId);
    // }

    // async getUsersWithFullName(): Promise<ProcurementEntity[]> {

    //     return await this.procurementRepository.find({ where: { name: null } });
    // }

     // async updatePhoneNumber(id: number, user: ProcurementEntity): Promise<ProcurementEntity> {
     //     await this.procurementRepository.update(id,this.updatePhoneNumber);
     //     return  this.procurementRepository.findOneBy({id:id});
     // }

 

 
    
    
    }
