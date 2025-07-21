import cors from '@fastify/cors';
import Fastify from 'fastify';
import { buildApiSpec } from '../scripts/codegen.js';
import { setupOpenApi } from './open-api.js';
import { setupRoutes } from './routes.js';

const fastify = Fastify({ logger: true });
await fastify.register(cors, { origin: '*' }); // TODO
await setupOpenApi(fastify);
setupRoutes(fastify);

const start = async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await buildApiSpec();
    }
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
