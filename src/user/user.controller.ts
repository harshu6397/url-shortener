// src/user/user.controller.ts

import { Controller, Get, Body, UseGuards, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from './user.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getUserProfile(@CurrentUser() user: User) {
    return { message: 'User profile retrieved successfully', data: user };
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  async updateUserProfile(@CurrentUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.updateUser(user.uniqueId, updateUserDto);
    return { message: 'User profile updated successfully' };
  }
}
