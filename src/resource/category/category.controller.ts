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
    @ApiOperation({description: "admin aas category create leh"})
    createCategory(@Body() dto: CreateCategoryDto) {
        return this.service.createCategory(dto)
    }

    @ApiOperation({description: "category luu id gaar ni sub category nemeh  "})
    @Post('subcategory')
    createSubCategory(@Body() dto: CreateSubCategory, ) {
        return this.service.createSubCategory(dto)
    }

    @Get()
    @ApiOperation({description: "buh category g awah"})
    getAllCategories() {
        return this.service.getAllCategories()
    }
    @ApiQuery({name: 'id'})
    @Get(':id')
    @ApiOperation({description: "category g id gaar ni awah "})
    getCategoryById(@Query() params) {
        return   this.service.getCategoryById(params.id)
        
    }

    @ApiQuery({name: 'id'})
    @Get('filters/:id/:type')
    @ApiOperation({description: "zariin filter g awah isFilter field g true = filter false = create ad  "})
    getFilterById(@Query('id') id, @Param('type') type: string) {

        return   this.service.getSubCategoryFiltersById(id, type)
        
    }
    
    @ApiQuery({name: 'id'})
    @Put(':id')
    @ApiOperation({description: "category update hiih "})
    updateCategoryId(@Body() dto: UpdateCategoryDto, @Query() id) {
        return this.service.updateCategoryById( id, dto)
    }
    // @Delete()
    // deleteAllCategory() {
    //     return this.service.deleteAllCategory()
    // }
}
