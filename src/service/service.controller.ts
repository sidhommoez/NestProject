import { Controller, Logger, Get, Delete, Post, UsePipes, ValidationPipe, Body, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { Service } from './service.entity';
import { User } from 'src/auth/user.entity';
import { ServiceDto } from './dto/service.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('SERVICES')
@Controller('service')
@UseGuards(AuthGuard())
export class ServiceController {
    constructor(private serviceService: ServiceService) { }
    private logger = new Logger('ServiceTypeController');

    @Get()
    @ApiBearerAuth("access-token")
    getServiceType(
        @GetUser() user: User
    ): Promise<Service[]> {
        return this.serviceService.getServices(user);
    }

    @Get('/:id')
    @ApiBearerAuth("access-token")
    getServiceTypeById(
        @Param('id', ParseIntPipe) id: string,
        @GetUser() user: User
    ): Promise<Service> {
        return this.serviceService.getServiceById(id,user);
    }

    @Delete('/:id')
    @ApiBearerAuth("access-token")
    deleteServiceTypeById(
        @Param('id', ParseIntPipe) id: string,
        @GetUser() user: User
    ): Promise<void> {
        return this.serviceService.deleteTServiceById(id,user);
    }

    @Post()
    @ApiBearerAuth("access-token")
    @UsePipes(ValidationPipe)
    createService(
        @Body() serviceDto:ServiceDto,
        @GetUser() user: User,
    ): Promise<Service> {
        return this.serviceService.createService(serviceDto,user);
    }

    @Patch('/:id/type')
    @ApiBearerAuth("access-token")
    updateService(
        @Param('id', ParseIntPipe) id: string,
        @Body() serviceDto:ServiceDto,
        @GetUser() user: User
    ): Promise<Service> {
        return this.serviceService.updateService(id,serviceDto,user)
    }
}
