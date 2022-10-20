import { Body, Controller, Post } from '@nestjs/common';
import { ZoneDto } from './zone.dto';
import { ZoneService } from './zone.service';

@Controller('zone')
export class ZoneController {
    constructor(private service: ZoneService) {}

    @Post()
    create(@Body() dto: ZoneDto) {
        return this.service.create(dto)
    }
}
