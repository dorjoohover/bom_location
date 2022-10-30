import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateAdTypeDto } from "./ad_type.dto";
import { AdTypeService } from "./ad_type.service";

@Controller('ad_type')
export class AdTypeController {
    constructor(private readonly service: AdTypeService) {}
    @Post()
    create(@Body() dto: CreateAdTypeDto ) {
        return this.service.create(dto)
    }

    @Get()
    getAllData() {
        return this.service.getAllData()
    }

    @Get(':id')
    getDataById(@Param() params) {
        return this.service.getDataById(params.id)
    }

}