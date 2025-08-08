import { defineConfig } from 'kysely-ctl';
import { db } from './src/database';

export default defineConfig({
  kysely: db,
  migrations: {
    migrationFolder: './migrations',
    migrationTableName: 'migrations',
    getMigrationPrefix: () => `${Date.now()}-`,
  },
});
