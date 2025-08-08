import cors from '@fastify/cors';
import Fastify from 'fastify';
import { buildApiSpec } from '../scripts/codegen.js';
import { auth } from './auth.js';
import { setupOpenApi } from './open-api.js';
import { setupAuthedRoutes } from './routes/authed/index.js';
import { setupPublicRoutes } from './routes/public/index.js';
import { toStandardHeaders } from './utils/requests.js';

const fastify = Fastify({
  logger: true,
  bodyLimit: 1024 * 1024 /* 1MB */,
});

await fastify.register(cors, {
  origin: [
    'http://localhost:8080',
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
  scopedFastify.addHook('preHandler', async (request, reply) => {
    try {
      const headers = toStandardHeaders(request.headers);
      const session = await auth.api.getSession({ headers });
      if (!session) {
        reply.code(401).send({ message: 'Unauthorized' });
      }
    } catch (_err) {
      reply.code(401).send({ message: 'Unauthorized' });
    }
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
