import { createConnection } from 'typeorm';

createConnection({
  url: process.env.DATABASE_URL,
  type: 'postgres',
  logging: process.env.NODE_ENV === 'development',
  entities: [`${__dirname}/../../../modules/**/infra/typeorm/entities/*`],
  migrations: [`${__dirname}/migrations/*`],
  cli: {
    migrationsDir: `${__dirname}/migrations`,
  },
});
