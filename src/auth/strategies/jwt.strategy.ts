import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { USER_SELECT } from '../../constants/selectedDBFields.json';
import * as errorMessages from '../../constants/responseMessages/errorMessages.json';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findUser({ email: payload.email }, USER_SELECT);
    if (!user) {
      throw new Error(errorMessages.USER_NOT_FOUND);
    }

    return user;
  }
}
