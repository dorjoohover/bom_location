import { Body, Controller, Get, HttpException, HttpStatus, Patch, Post, Put } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';

import { InjectModel } from '@nestjs/mongoose';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { Item, ItemDocument } from 'src/schema';
import { ItemDto } from './items.dto';

@Controller('items')
@ApiTags('Items')
export class ItemsController {
  constructor( @InjectModel(Item.name) private model: Model<ItemDocument>){}

  @Post()
  async createItem(@Body() dto: ItemDto) {
    try {
      let item = await this.model.findOne({$or: [{name: dto.name}, {type: dto.type}]})
      if(item) throw new HttpException('found', HttpStatus.FOUND)
      item = await this.model.create({
        name: dto.name,
        index: dto.index,
        type: dto.type, 
        position: dto.position,
        parentId: dto.parentId,
        other: dto.other, 
        isSearch: dto.isSearch,
        isUse: dto.isUse
      })
      return item 
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }

  @Get()
  async getItems() {
    try {
      let items = await this.model.find()
      return items
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }

  @Get('/:type')
  @ApiParam({name: 'type'})
  async getByType(@Param('type') type: string) {
    try {
      let item = await this.model.findOne({type: type})
      if(!item) throw new HttpException('not found', HttpStatus.NOT_FOUND)
      return item
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }

  @Put('/:id')
  @ApiParam({name: 'id'})
  async updateItems(@Param('id') id: string) {
    try {
      let items = await this.model.updateOne({_id: id}, {$set: {'other': true}})
      return items
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }

  @Patch(':id')
  @ApiParam({name: 'id'})
  async updateItemById(@Param('id') id: string, @Body() dto: ItemDto,) {
    try {
      let item = await this.model.findByIdAndUpdate(id, {
        name: dto.name,
        index: dto.index,
        type: dto.type, 
        position: dto.position,
        parentId: dto.parentId,
        other: dto.other, 
        isSearch: dto.isSearch,
        isUse: dto.isUse
      })
      return item
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }
}
