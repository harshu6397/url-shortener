import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UserService } from '../user/user.service';
import { generateRandomPassword } from 'src/utils/common';
import { USER_SELECT } from 'src/constants/selectedDBFields.json';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    const { name, emails } = profile;
    const email = emails[0].value;
    // let user = await this.userService.findByEmail(email);
    let user = await this.userService.findUser({ email }, USER_SELECT);

    if (!user) {
      user = await this.userService.createUser({
        username: name.givenName,
        email,
        password: generateRandomPassword(),
        avatarUrl: profile.photos[0].value,
      });
    }

    done(null, user);
  }
}
