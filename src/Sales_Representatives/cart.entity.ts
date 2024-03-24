import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SellerEntity } from "./seller.entity";





@Entity("order")
export class CartEntity{

    @PrimaryGeneratedColumn()
    serialId: number;

    @Column()
    productId: number;

    @Column({name:'fullName', type: 'varchar', length: 150 })
    productName: string;

    @Column()
    productQuantity: number;

    @Column()
    productPrice: number;

    @ManyToOne(() => SellerEntity, seller => seller.carts)
    seller: SellerEntity;

}

/*@Entity("order")
export class OrderEntity{

    @Column()
    serialId: number;

    @PrimaryColumn()
    productId: number;

    @Column({name:'fullName', type: 'varchar', length: 150 })
    productName: string;

    @Column()
    productQuantity: number;

    @Column()
    productPrice: number;

}*/