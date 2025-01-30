import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  db: process.env.DB_NAME,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  pass: process.env.DB_PWD,
  sync: true,
  autoloadEntities: true,
}));
