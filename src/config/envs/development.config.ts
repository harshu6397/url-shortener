export default {
  JWT_SECRET_KEY: process.env.JWT_SECRET || 'defaultSecret',
  DATABASE_CONFIG: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.DATABASE_NAME || 'dummy',
  },
};
