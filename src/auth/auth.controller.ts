import { Controller, Get, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SignInUserDto } from '../user/dto/signin-user.dto';
import { GoogleAuthGuard } from '../guards/google-auth.guard';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() signInUserDto: SignInUserDto) {
    return this.authService.login(signInUserDto);
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    // Initiates the Google OAuth flow
    // The GoogleAuthGuard will handle the redirection
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleLoginRedirect(@Req() req: Request, @Res() res: Response) {
    // Handle Google OAuth redirect
    const user = req.user as any;

    // Generate JWT for the user
    const payload = { email: user.email, sub: user.uniqueId };
    const accessToken = this.authService.generateJwt(payload);

    // Redirect to frontend with JWT token
    res.redirect(`http://localhost:3000?token=${accessToken}`);
  }
}
