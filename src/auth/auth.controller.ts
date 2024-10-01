import { Controller, Get, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { GoogleAuthGuard } from '../common/guards/google-auth.guard';
import { Request, Response } from 'express';
import {
  RegisterUserDoc,
  LoginUserDoc,
  GoogleLoginDoc,
  GoogleLoginCallbackDoc,
} from 'src/auth/swagger/auth-api.decorators';
import { ApiTags } from '@nestjs/swagger';
import * as successMessages from '../constants/responseMessages/successMessages.json';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService ) {}

  @Post('register')
  @RegisterUserDoc()
  async register(@Body() createUserDto: CreateUserDto) {
    const response = await this.authService.register(createUserDto);
    return {
      message: successMessages.USER_REGISTERED_SUCCESS,
      data: response,
    };
  }

  @Post('login')
  @LoginUserDoc()
  async login(@Body() signInUserDto: SignInUserDto) {
    const response = await this.authService.login(signInUserDto);
    return { message: successMessages.USER_LOGGED_IN_SUCCESS, data: response };
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  @GoogleLoginDoc()
  async googleLogin() {
    // Initiates the Google OAuth flow
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @GoogleLoginCallbackDoc()
  async googleLoginRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as any;
    const payload = { email: user.email, sub: user.uniqueId };
    const accessToken = this.authService.generateJwt(payload);
    return res.redirect(`${this.configService.get<string>('FRONTEND_BASE_URL')}/auth/callback?token=${accessToken}`);
  }
}
