import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from '../auth/user.entity';
import { Service } from "src/service/service.entity";

@Entity()
export class Bid extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => Service, service => service.bids, { primary: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    service:Service

    @ManyToOne(type => User, user => user.bids, { primary: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    user:User

    @Column()
    Price: number;

    @CreateDateColumn()
    createdAt

    @UpdateDateColumn()
    updatedAt
}

