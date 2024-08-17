import { ConfigService } from '@nestjs/config';

interface JwtConfig {
  secret: string;
  signOptions: { expiresIn: string };
}

export const getJwtConfig = (configService: ConfigService): JwtConfig => {
  return {
    secret: configService.get<string>('JWT_SECRET_KEY') || 'defaultSecretKey',
    signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1d' },
  };
};
