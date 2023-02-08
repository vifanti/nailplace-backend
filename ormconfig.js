require('dotenv/config');

module.exports = {
  url: process.env.DATABASE_URL,
  type: 'postgres',
  logging: process.env.NODE_ENV === 'development',
  entities: [`./${process.env.ROOT_DIR}/modules/**/infra/typeorm/entities/*`],
  migrations: [`./${process.env.ROOT_DIR}/shared/infra/typeorm/migrations/*`],
  cli: {
    migrationsDir: `./${process.env.ROOT_DIR}/shared/infra/typeorm/migrations`,
  },
  ...(process.env.NODE_ENV === 'development' ? {} : {
    ssl: {
      rejectUnauthorized: false,
    }
  })
};
