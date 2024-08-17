import { Controller, Get, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { Request, Response } from 'express';
import {
  RegisterUserDoc,
  LoginUserDoc,
  GoogleLoginDoc,
  GoogleLoginCallbackDoc,
} from 'src/auth/swagger/auth-api.decorators';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @RegisterUserDoc()
  async register(@Body() createUserDto: CreateUserDto) {
    return {
      message: 'User registered successfully',
      data: await this.authService.register(createUserDto),
    };
  }

  @Post('login')
  @LoginUserDoc()
  async login(@Body() signInUserDto: SignInUserDto) {
    return {
      message: 'User logged in successfully',
      data: await this.authService.login(signInUserDto),
    };
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
    return res.redirect(`http://localhost:3000/auth/callback?token=${accessToken}`);
  }
}
