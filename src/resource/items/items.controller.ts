import { Body, Controller, Get, HttpException, HttpStatus, Post, Put } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { Item, ItemDocument } from 'src/schema';
import { CreateItemDto } from './items.dto';
import { ItemsService } from './items.service';
@Controller('items')
@ApiTags('Items')
export class ItemsController {
  constructor(private service: ItemsService, @InjectModel(Item.name) private model: Model<ItemDocument>){}

  @Post()
  async createItem(@Body() dto: CreateItemDto) {
    try {
      let item = await this.model.findOne({$or: [{name: dto.name}, {type: dto.type}]})
      if(item) throw new HttpException('found', HttpStatus.FOUND)
      item = await this.model.create({
        name: dto.name,
        type: dto.type, 
        types: dto.types, 
        value: dto.value,
        parentId: dto.parentId,
        input: dto.input, 
        max: dto.max
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

  @Put()
  async updateItems() {
    try {
      let items = await this.model.update({}, {$set: {'max': ''}})
      return items
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }
}
