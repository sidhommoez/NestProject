import { EntityRepository, Repository, getRepository } from 'typeorm';
import { ServiceType } from './service-type.entity';
import { ServiceTypeDto } from './dto/service-type.dto';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(ServiceType)
export class ServiceTypeRepository extends Repository<ServiceType> {

  async createServiceType(serviceTypeDto:ServiceTypeDto,
  ): Promise<ServiceType> {
    const serviceType = new ServiceType();
    Object.assign(serviceType, { ...serviceTypeDto });
    const checkDublicated = await getRepository(ServiceType).findOne({name:serviceType.name})
    if(checkDublicated){
      throw new BadRequestException(`There is already a type named "${serviceType.name}"`)
    }else {
    await serviceType.save();
    return serviceType;
    }
  }
  async getAllServiceType(
    ): Promise<ServiceType[]> {
      return this.find();
    }
}
