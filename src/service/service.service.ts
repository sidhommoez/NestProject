import { Injectable, NotFoundException } from '@nestjs/common';
import { Service } from './service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceRepository } from './service.repository';
import { ServiceDto } from './dto/service.dto';
import { User } from 'src/auth/user.entity';
import { ServiceType } from 'src/service-type/service-type.entity';

@Injectable()
export class ServiceService {
    constructor(
    @InjectRepository(Service)
    private serviceRepository: ServiceRepository){}

    
  async createService(
    serviceDto:ServiceDto,
    user: User,
  ): Promise<Service> {
    return this.serviceRepository.createService(serviceDto,user)
  }
  
  getServices(user: User): Promise<Service[]> {
    return this.serviceRepository.getAllServices(user)
  }

  async getServiceById(
    id: string,
    user: User,
  ): Promise<Service> {
    const result = await this.serviceRepository.findOne({ where: { id,userId:user.id } });
    if (!result) {
      throw new NotFoundException(`the service with ID "${id}" not found`);
    }
    return result;
  }

  async updateService(
    id: string,
    serviceDto:ServiceDto,
    user: User,
  ): Promise<Service> {
    const { name } = serviceDto;
    const searchForType = await this.getServiceById(id,user);
    Object.assign(searchForType,  { name });
    await searchForType.save();
    return searchForType;
  }

  async deleteTServiceById(
    id: string,
    user: User,
  ): Promise<void> {
    const result = await this.serviceRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`the service with ID "${id}" not found`);
    }
  }
}
