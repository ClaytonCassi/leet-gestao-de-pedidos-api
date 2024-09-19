module.exports = [
  {
    name: "default",
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: process.env.DB_SSL === "true",
    extra: {
      ssl: {
        rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === "true"
      }
    },
    entities: [
      process.env.NODE_ENV === 'production'
        ? "./dist/modules/**/infra/typeorm/entities/*.js" // Caminho para os arquivos compilados em produção
        : "./src/modules/**/infra/typeorm/entities/*.ts" // Caminho para o desenvolvimento
    ],
    migrations: [
      process.env.NODE_ENV === 'production'
        ? "./dist/shared/infra/typeorm/migrations/*.js" // Caminho para os arquivos compilados em produção
        : "./src/shared/infra/typeorm/migrations/*.ts" // Caminho para o desenvolvimento
    ],
    cli: {
      migrationsDir: process.env.NODE_ENV === 'production'
        ? "./dist/shared/infra/typeorm/migrations" // Caminho para o CLI de migrações em produção
        : "./src/shared/infra/typeorm/migrations" // Caminho para o CLI de migrações em desenvolvimento
    }
  }
];

