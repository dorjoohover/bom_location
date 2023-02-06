import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { DiscrictDto } from './district.dto';
import { DistrictService } from './district.service';

@ApiTags('Disctrict')
@Controller('district')
export class DistrictController {
    constructor(private service: DistrictService) {}
    @Post()
    create(@Body() dto: DiscrictDto) {
        return this.service.create(dto)
    }

    @Get()
    getData() {
        return this.service.getData()
    }

    @Get(':id')
    @ApiParam({name: 'id'})
    getDataById(@Param('id') id: string) {
        return this.service.getDataById(id)
    }
}
