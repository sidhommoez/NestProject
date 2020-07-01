import { Controller, UseGuards, Get, ValidationPipe, Query, Logger, Param, ParseIntPipe, Delete, Post, UsePipes, Body, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ServiceTypeService } from './service-type.service';
import { ServiceType } from './service-type.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { ServiceTypeDto } from './dto/service-type.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('SERVICE-TYPES')
@Controller('service-type')
@ApiBearerAuth("access-token")
@UseGuards(AuthGuard())
export class ServiceTypeController {
    constructor(private serviceTypeService: ServiceTypeService) { }
    private logger = new Logger('ServiceTypeController');

    @Get()
    @ApiBearerAuth("access-token")
    getServiceType(
        @GetUser() user: User
    ): Promise<ServiceType[]> {
        return this.serviceTypeService.getServiceTypes();
    }

    @Get('/:id')
    @ApiBearerAuth("access-token")
    getServiceTypeById(
        @Param('id', ParseIntPipe) id: string,
    ): Promise<ServiceType> {
        return this.serviceTypeService.getServiceTypeById(id);
    }

    @Delete('/:id')
    @ApiBearerAuth("access-token")
    deleteServiceTypeById(
        @Param('id', ParseIntPipe) id: string,
    ): Promise<void> {
        return this.serviceTypeService.deleteTServiceTypeById(id);
    }

    @Post()
    @ApiBearerAuth("access-token")
    @UsePipes(ValidationPipe)
    createTask(
        @Body() serviceTypeDto:ServiceTypeDto
    ): Promise<ServiceType> {
        return this.serviceTypeService.createService(serviceTypeDto);
    }

    @Patch('/:id/type')
    @ApiBearerAuth("access-token")
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: string,
        @Body() serviceTypeDto:ServiceTypeDto
    ): Promise<ServiceType> {
        return this.serviceTypeService.updateServiceType(id,serviceTypeDto);
    }
}