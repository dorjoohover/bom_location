import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import {
  Param,
  Query,
  UseGuards
} from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PointSendType } from 'src/config/enum';
import { UserAccessGuard } from 'src/guard/user.guard';
import { Feedback, FeedbackDocument, User, UserDocument } from 'src/schema';
import { S3Service } from '../ad/s3.service';
import { FeedbackDto, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly service: UserService,
    private s3Service: S3Service,
    @InjectModel(User.name) private model: Model<UserDocument>,
    @InjectModel(Feedback.name) private feedbackModel: Model<FeedbackDocument>,
  ) {}

  @Get()
  getAllUser() {
    return this.service.getAllUsers();
  }
  @UseGuards(UserAccessGuard)
  @ApiBearerAuth('access-token')
  @Get('me')
  async getUserByEmail(@Request() { user }) {
    if (!user) return null;

    let res = await this.model
      .findById(user._id)
      .populate('pointHistory.sender', 'id username phone email', this.model)
      .populate('pointHistory.receiver', 'id username phone email', this.model);

    return res;
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  async getUserById(@Param('id') id: string) {
    return this.service.getUserById(id);
  }

  @Get("update/:id/:status/:message")
  @ApiParam({name: 'id'})
  @ApiParam({name: 'status'})
  @ApiQuery({name: 'message'})
  @UseGuards(UserAccessGuard)
  @ApiBearerAuth('access-token')
  async updateUser(@Request() {user}, @Param("id") id, @Param('status') status, @Query('message') message) {
    try {
      if (user.userType == 'admin' || user.userType == 'system') {
        let client = await this.model
          .findByIdAndUpdate(id, {
            message: message,
            status: status,
          })

        if (!client) return false;
        return true;
      }
      return false;
    } catch (error) {
      throw new HttpException('error', 500);
    }
  }

  @UseGuards(UserAccessGuard)
  @ApiBearerAuth('access-token')
  @Post('feedback')
  async sendFeedback(@Request() { user }, @Body() dto: FeedbackDto) {
    try {
      let feedback = await this.feedbackModel.create({
        user: user['_id'],
        title: dto.title ?? '',
        message: dto.message,
      });
      if (feedback) return true;
       return false;
    } catch (error) {
      console.log(error)
      throw new HttpException('error', 500);
    }
  }

  @UseGuards(UserAccessGuard)
  @ApiBearerAuth('access-token')
  @Get('feedback/get')
  async getFeedback(@Request() { user }) {
    try {
      if (user.userType == 'admin' || user.userType == 'system') {
        let feedbacks = await this.feedbackModel
          .find().populate('user', 'username phone email', this.model)
          .sort({ createdAt: 'desc' });
        if (!feedbacks) return false;
        return feedbacks;
      }
      return false;
    } catch (error) {
      throw new HttpException('error', 500);
    }
  }

  @UseGuards(UserAccessGuard)
  @ApiBearerAuth('access-token')
  @Get('point/:id/:point/:type/:message')
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'type' })
  @ApiParam({ name: 'point' })
  @ApiQuery({ name: 'message' })
  async sendPoint(
    @Request() { user },
    @Param('id') id: string,
    @Param('point') point: number,
    @Param('type') type,
    @Query('message') message: string,
  ) {
    if (!user) throw new HttpException('user not found', 400);
    let receiver = await this.service.getUserById(id);
    if (!receiver) return { message: 'not found receiver', status: 400 };
    if (user.point >= point) {
      user.point =
        Number.parseFloat(user.point.toString()) -
        Number.parseFloat(point.toString());
      user.pointHistory.push({
        point: point,
        sender: user['_id'],
        receiver: receiver._id,
        type: PointSendType.sender,
        title: type,
        message: message ?? '',
      });
      await user.save();
      receiver.point =
        Number.parseFloat(receiver.point.toString()) +
        Number.parseFloat(point.toString());
      receiver.pointHistory.push({
        point: point,
        sender: user['_id'],
        receiver: receiver._id,
        type: PointSendType.receiver,
        title: type,
        message: message ?? '',
      });
      await receiver.save();

      return { message: 'success', status: 200 };
    }
    return { message: 'not enough points', status: 400 };
  }

  @UseGuards(UserAccessGuard)
  @ApiBearerAuth('access-token')
  @Put()
  async editUser(
    @Request() { user },
    @Body() dto: UpdateUserDto,
  ) {
    if (!user) throw new HttpException('user not found', 400);
    dto.socials = JSON.parse(dto.socials);
    
    
    if (dto.agentAddition) {
        let agent = dto.agentAddition.trim()
        dto.agentAddition = JSON.parse(agent);
    }
    if (dto.organizationAddition) {
        let org = dto.organizationAddition.trim()
        dto.organizationAddition = JSON.parse(dto.organizationAddition);
    }
    let key;

    return this.service.editUser(user, dto,);
  }
}
