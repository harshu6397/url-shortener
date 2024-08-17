import { Controller, Get, UseGuards, Patch, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from './user.model';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUserProfileDoc, UpdateUserProfileDoc } from 'src/user/swagger/user-api.decorators';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth('JWT-auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @GetUserProfileDoc()
  async getUserProfile(@CurrentUser() user: User) {
    return { message: 'User profile retrieved successfully', data: user };
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @UpdateUserProfileDoc()
  async updateUserProfile(@CurrentUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.updateUser(user.uniqueId, updateUserDto);
    return { message: 'User profile updated successfully' };
  }
}
