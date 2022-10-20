import { Body, Controller, Post } from '@nestjs/common';
import { CommitteeDto } from './committee.dto';
import { CommitteeService } from './committee.service';

@Controller('committee')
export class CommitteeController {
    constructor(private service: CommitteeService) {}
    @Post()
    create(@Body() dto: CommitteeDto) {
        return this.service.create(dto)
    }
}
