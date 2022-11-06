import { Controller, Post, Get, Param,Put, Body } from '@nestjs/common';
import { CreateFilterDto, UpdateFilterDto } from './filter.dto';
import { FilterService } from './filter.service';

@Controller('filter')
export class FilterController {
    constructor(private readonly service: FilterService) {}

    @Post()
    createFilter(@Body() dto : CreateFilterDto) {
        return this.service.createFilter(dto)
    }

    
    @Get()
    getAllFilters() {
        return this.service.getAllFilters()
    }
    
    @Get(':id')
    getFilterById(@Param() params) {
        return this.service.getFilterById(params.id)
    }
    @Put() 
    updateFilterById(@Body() dto: UpdateFilterDto) {
        return this.service.updateFilterById(dto)
    }

}
