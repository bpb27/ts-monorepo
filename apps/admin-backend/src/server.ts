import cors from '@fastify/cors';
import Fastify from 'fastify';
import { buildApiSpec } from '../scripts/codegen.js';
import { setupOpenApi } from './open-api.js';
import { setupAuthedRoutes } from './routes/authed/index.js';
import { setupPublicRoutes } from './routes/public/index.js';

const fastify = Fastify({ logger: true, bodyLimit: 1024 * 1024 /* 1MB */ });

await fastify.register(cors, {
  origin: [
    'http://localhost:8081',
    'http://localhost:3000',
    'https://example.com',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86_400,
});

await setupOpenApi(fastify);

setupPublicRoutes(fastify);

fastify.register((scopedFastify, _opts, done) => {
  scopedFastify.addHook('onRequest', async (request, reply) => {
    /*
      TODO:
      - Fastify cookie parsing?
      - LRU cache for session data to prevent repeated network hops?
      - Abort controller for fetch?
      - Auth service url ENV
      - Proper typing
    */

    const sessionResponse = await fetch(
      'http://localhost:3000/api/auth/get-session',
      {
        method: 'GET',
        headers: {
          Cookie: request.headers.cookie,
          Accept: 'application/json',
        },
      }
    );

    if (!sessionResponse.ok) {
      reply.code(401).send({ error: 'Unauthenticated' });
      return;
    }

    const session = await sessionResponse.json();
    if (!session) {
      reply.code(401).send({ error: 'Unauthenticated' });
      return;
    }

    // @ts-expect-error
    request.sessionData = session;
  });

  setupAuthedRoutes(scopedFastify);
  done();
});

const start = async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await buildApiSpec(); // TODO: move to watch rebuild handler
    }
    await fastify.listen({ port: Number(process.env.PORT) });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
