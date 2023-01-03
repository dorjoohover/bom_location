import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto, CreateSubCategory } from './category.dto';
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

    @Delete()
    deleteAllCategory() {
        return this.service.deleteAllCategory()
    }
}
