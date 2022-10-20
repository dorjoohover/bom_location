import { Body, Controller, Post } from '@nestjs/common';
import { LocationDto } from './location.dto';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
    constructor(private service: LocationService){}

    @Post()
    create(@Body() dto: LocationDto) {
        return this.service.create(dto)
    }
}
