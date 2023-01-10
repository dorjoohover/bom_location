import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { Put, Query } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { domainToASCII } from 'url';
import { CreateCategoryDto, CreateSubCategory, UpdateCategoryDto } from './category.dto';
import { CategoryService } from './category.service';
@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private readonly service: CategoryService){}

    @Post()
    @ApiOperation({description: "Get suggesstion ad"})
    createCategory(@Body() dto: CreateCategoryDto) {
        return this.service.createCategory(dto)
    }
    @Post('subcategory')
    createSubCategory(@Body() dto: CreateSubCategory, ) {
        return this.service.createSubCategory(dto)
    }

    @Get()
    getAllCategories() {
        return this.service.getAllCategories()
    }
    @ApiQuery({name: 'id'})
    @Get(':id')
    getCategoryById(@Query() params) {
        return   this.service.getCategoryById(params.id)
        
    }

    @ApiQuery({name: 'id'})
    @Get('filters/:id/:type')
    getFilterById(@Query('id') id, @Param('type') type: string) {

        return   this.service.getSubCategoryFiltersById(id, type)
        
    }
    
    @ApiQuery({name: 'id'})
    @Put(':id')
    updateCategoryId(@Body() dto: UpdateCategoryDto, @Query() id) {
        return this.service.updateCategoryById( id, dto)
    }
    @Delete()
    deleteAllCategory() {
        return this.service.deleteAllCategory()
    }
}
