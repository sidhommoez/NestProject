import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from '../auth/user.entity';
import { Bid } from "src/Bid/bid.entity";
import { ServiceType } from "src/service-type/service-type.entity";

@Entity()
export class Service extends BaseEntity {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    startingPrice: number;

    @ManyToOne(type => User, user => user.products, { eager: false })
    user: User;

    @OneToMany(Type => Bid, bid => bid.service)
    bids : Bid[]

    @ManyToOne(type => ServiceType,type => type.services)
    type: ServiceType;
    
    @CreateDateColumn()
    createdAt

    @UpdateDateColumn()
    updatedAt
}

