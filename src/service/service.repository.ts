import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Service } from './service.entity';
import { ServiceDto } from './dto/service.dto';
import { User } from 'src/auth/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { ServiceType } from 'src/service-type/service-type.entity';

@EntityRepository(Service)
export class ServiceRepository extends Repository<Service> {
  private logger = new Logger('Service');
  async createService(serviceDto:ServiceDto,
    user:User,
  ): Promise<Service> {
    const service = new Service();
    const type = await getRepository(ServiceType).findOne({where:{id:serviceDto.serviceType}})
    Object.assign(service, { ...serviceDto,user,type });
    await service.save();
    delete service.user;
    return service;
  }

  async getAllServices(
    user:User
    ): Promise<Service[]> {
      const query = this.createQueryBuilder('service');
      query.where('service.userId = :userId', { userId: user.id });
      try {
        return query.getMany();
      } catch (error) {
        this.logger.error(`Failed to get service for user "${user.username}"`, error.stack);
        throw new InternalServerErrorException();
      }
    }
}
