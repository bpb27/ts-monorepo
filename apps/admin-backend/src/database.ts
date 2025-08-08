import {
  CamelCasePlugin,
  Kysely,
  ParseJSONResultsPlugin,
  PostgresDialect,
} from 'kysely';
import pg from 'pg';
import type { DB } from './generated-database-types.js';

const plugins = [new CamelCasePlugin(), new ParseJSONResultsPlugin()];

export const createDbPool = () =>
  new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        max: 10,
      }),
    }),
    log: ['query'],
    plugins,
  });

export const db = createDbPool();
