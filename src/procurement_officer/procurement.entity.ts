import{ Entity , Column, PrimaryGeneratedColumn, BeforeInsert} from 'typeorm';
@Entity("procurement_officer")
export class ProcurementEntity{

    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar' })
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column({ type:'varchar'})
    profilePicture: string;

    @Column()
    address: string;

    @BeforeInsert()
    generateId() {
        this.id=Math.floor(Math.random()*10000)
    }


}