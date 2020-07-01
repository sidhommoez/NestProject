import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceType } from './service-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceTypeRepository } from './service-type.repository';
import { ServiceTypeDto } from './dto/service-type.dto';

@Injectable()
export class ServiceTypeService {
  constructor(
    @InjectRepository(ServiceType)
    private serviceTypeRepository: ServiceTypeRepository,
  ) { }

  async createService(
    serviceTypeDto:ServiceTypeDto
  ): Promise<ServiceType> {
    return this.serviceTypeRepository.createServiceType(serviceTypeDto)
  }
  
  getServiceTypes(): Promise<ServiceType[]> {
    return this.serviceTypeRepository.getAllServiceType()
  }

  async getServiceTypeById(
    id: string
  ): Promise<ServiceType> {
    const result = await this.serviceTypeRepository.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException(`service type with ID "${id}" not found`);
    }
    return result;
  }

  async updateServiceType(
    id: string,
    serviceTypeDto:ServiceTypeDto
  ): Promise<ServiceType> {
    const { name } = serviceTypeDto;
    const searchForType = await this.getServiceTypeById(id);
    Object.assign(searchForType,  { name });
    await searchForType.save();
    return searchForType;
  }

  async deleteTServiceTypeById(
    id: string,
  ): Promise<void> {
    const result = await this.serviceTypeRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`service type with ID "${id}" not found`);
    }
  }
}
