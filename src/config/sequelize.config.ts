import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';

export const getSequelizeConfig = (configService: ConfigService): SequelizeModuleOptions => {
  const databaseConfig = configService.get('DATABASE_CONFIG');

  return {
    dialect: 'mysql',
    host: databaseConfig.host,
    port: databaseConfig.port,
    username: databaseConfig.username,
    password: databaseConfig.password,
    database: databaseConfig.database,
    autoLoadModels: true,
    query: { raw: true },
  };
};
