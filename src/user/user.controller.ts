import { Controller, Get, UseGuards, Patch, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from './user.model';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUserProfileDoc, UpdateUserProfileDoc } from 'src/user/swagger/user-api.decorators';
import * as successMessages from '../constants/responseMessages/successMessages.json';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @GetUserProfileDoc()
  async getUserProfile(@CurrentUser() user: User) {
    return { message: successMessages.USER_PROFILE_RETRIEVED_SUCCESS, data: user };
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @UpdateUserProfileDoc()
  async updateUserProfile(@CurrentUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.updateUser(user.uniqueId, updateUserDto);
    return { message: successMessages.USER_PROFILE_UPDATED_SUCCESS };
  }
}
