import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export const getSequelizeConfig = (configService: ConfigService): SequelizeModuleOptions => {
  const databaseConfig: DatabaseConfig = configService.get<DatabaseConfig>('DATABASE_CONFIG');

  return {
    dialect: 'mysql',
    host: databaseConfig.host || 'localhost',
    port: databaseConfig.port || 3306,
    username: databaseConfig.username || 'root',
    password: databaseConfig.password || '',
    database: databaseConfig.database || 'test',
    autoLoadModels: true,
    query: { raw: true },
  };
};
