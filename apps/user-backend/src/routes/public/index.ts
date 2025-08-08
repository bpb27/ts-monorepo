import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

export const setupPublicRoutes = (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/health',
    schema: {
      operationId: 'healthCheck',
      description: 'Health check',
      tags: ['health'],
      response: {
        200: z.object({
          message: z.string(),
        }),
      },
    },
    handler: (_req, reply) => {
      reply.send({ message: 'ok' });
    },
  });
};
