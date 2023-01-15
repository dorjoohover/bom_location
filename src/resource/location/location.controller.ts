import { Body, Controller, Post, Get , Param, Delete} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocationDto } from './location.dto';
import { LocationService } from './location.service';
@ApiTags('Location')
@Controller('location')
export class LocationController {
    constructor(private service: LocationService){}

    @Post()
    create(@Body() dto: LocationDto) {
        return this.service.create(dto)
    }

    @Get()
    get() {
        return this.service.get()
    }

    @Get(':id')
    getByDiscrict(@Param() params) {
        return this.service.getByDiscrict(params.id);
    }

    @Get('byId/:id') 
    getByLocationId(@Param('id') id) {
        return this.service.getByLocationId(id)
    }

    @Delete()
    deleteAllLocation() {
        return this.service.deleteAllLocation()
    }
}
