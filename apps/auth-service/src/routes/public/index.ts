import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { auth } from '../../auth.js';
import { toStandardRequest } from '../../utils/requests.js';

export const setupPublicRoutes = (fastify: FastifyInstance) => {
  fastify.route({
    method: ['GET', 'POST'],
    url: '/api/auth/*',
    async handler(request, reply) {
      try {
        const req = toStandardRequest(request);
        const response = await auth.handler(req);
        reply.status(response.status);
        response.headers.forEach((value, key) => {
          reply.header(key, value);
        });
        reply.send(response.body ? await response.text() : null);
      } catch (error) {
        fastify.log.error('Authentication Error:', error);
        reply.status(500).send({
          error: 'Internal authentication error',
          code: 'AUTH_FAILURE',
        });
      }
    },
  });

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
