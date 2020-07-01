import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Service } from '../service/service.entity';
import { Bid } from "src/Bid/bid.entity";


@Entity()
@Unique(['username'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username: string;


    @Column()
    password: string;


    @Column()
    salt: string;

    @Column({nullable:true})
    stripeId: string

    @OneToMany(type => Service, service => service.user, { eager: true })
    products: Service[];


    @OneToMany(Type => Bid, rolePermission => rolePermission.user)
    bids : Bid[]

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password; //Devuelve true si los hash coinciden
    }
}