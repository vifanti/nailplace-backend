require('dotenv/config');

module.exports = {
  url: process.env.DATABASE_URL,
  type: 'postgres',
  logging: process.env.NODE_ENV === 'development',
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
};
