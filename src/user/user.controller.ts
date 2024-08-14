import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator'; // Import the custom decorator

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getUserProfile(@CurrentUser() user) {
    return this.userService.findById(user.userId);
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  async updateUserProfile(@CurrentUser() user, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateProfile(user.userId, updateUserDto);
  }
}
