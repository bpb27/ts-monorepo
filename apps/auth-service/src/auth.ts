import { betterAuth } from 'better-auth';
import { openAPI } from 'better-auth/plugins';
import { db } from './database.js';
import { djangoPassword } from './utils/django-auth.js';

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    'http://localhost:3000',
    'http://localhost:8080',
    'https://example.com',
  ],
  emailAndPassword: {
    enabled: true,
    password: djangoPassword,
  },
  database: {
    db,
    type: 'postgres' as const,
  },
  session: {
    expiresIn: 60 * 60, // 1 hour
    cookieCache: {
      enabled: true,
    },
  },
  plugins: [
    openAPI({
      disableDefaultReference: false, // docs at /api/auth/reference
    }),
  ],
});
