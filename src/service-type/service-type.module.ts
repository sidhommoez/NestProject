import { Module } from '@nestjs/common';
import { ServiceTypeService } from './service-type.service';
import { ServiceTypeController } from './service-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceTypeRepository } from './service-type.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceTypeRepository]),
    AuthModule
  ],
  providers: [ServiceTypeService],
  controllers: [ServiceTypeController]
})
export class ServiceTypeModule {}
