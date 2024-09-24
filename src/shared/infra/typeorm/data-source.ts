// src/shared/infra/typeorm/data-source.ts

import 'dotenv/config';
import { DataSource } from 'typeorm';

const isProduction = process.env.NODE_ENV === 'production';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true' } : false,
  entities: [
    isProduction
      ? './dist/modules/**/infra/typeorm/entities/*.js'
      : './src/modules/**/infra/typeorm/entities/*.ts',
  ],
  migrations: [
    isProduction
      ? './dist/shared/infra/typeorm/migrations/*.js'
      : './src/shared/infra/typeorm/migrations/*.ts',
  ],
});

export default dataSource;
