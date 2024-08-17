import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import * as bcrypt from 'bcrypt';
import * as errorMessages from '../constants/responseMessages/errorMessages.json';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const { email, username } = createUserDto;

    // Check if a user with the same email already exists
    const existingUserByEmail = await this.userService.findUser({ email }, ['email']);
    if (existingUserByEmail) {
      throw new ConflictException(errorMessages.USER_EMAIL_ALREADY_EXISTS);
    }

    // Check if a user with the same username already exists
    const existingUserByUsername = await this.userService.findUser({ username }, ['username']);
    if (existingUserByUsername) {
      throw new ConflictException(errorMessages.USER_USERNAME_ALREADY_EXISTS);
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    // Generate JWT token
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async login(signInUserDto: SignInUserDto): Promise<any> {
    const { email, password } = signInUserDto;
    const user = await this.userService.findUser({ email }, ['email', 'password']);
    if (!user) {
      throw new UnauthorizedException(errorMessages.INVALID_CREDENTIALS);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException(errorMessages.INVALID_CREDENTIALS);
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  generateJwt(payload: any): string {
    return this.jwtService.sign(payload);
  }
}
