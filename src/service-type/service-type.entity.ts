import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from '../auth/user.entity';
import { Bid } from "src/Bid/bid.entity";
import { Service } from "src/service/service.entity";

@Entity()
export class ServiceType extends BaseEntity {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @OneToMany(type => Service, service => service.type, { eager: true })
    services: Service[];

    @CreateDateColumn()
    createdAt

    @UpdateDateColumn()
    updatedAt
}

