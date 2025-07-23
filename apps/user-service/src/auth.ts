import { betterAuth } from 'better-auth';
import { openAPI } from 'better-auth/plugins';
import { db } from './database.js';

export const auth = betterAuth({
  trustedOrigins: [
    'http://localhost:3000',
    'http://localhost:8080',
    'https://example.com',
  ],
  emailAndPassword: {
    enabled: true,
  },
  database: {
    db,
    type: 'postgres' as const,
  },
  plugins: [
    openAPI({
      disableDefaultReference: true,
    }),
  ],
});
