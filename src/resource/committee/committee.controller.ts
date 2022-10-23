import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommitteeDto } from './committee.dto';
import { CommitteeService } from './committee.service';

@Controller('committee')
export class CommitteeController {
    constructor(private service: CommitteeService) {}
    @Post()
    create(@Body() dto: CommitteeDto) {
        return this.service.create(dto)
    }
    @Get() 
    getData() {
        return this.service.getData()
    }
}
