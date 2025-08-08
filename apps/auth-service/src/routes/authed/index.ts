import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { db } from '../../database.js';

export const setupAuthedRoutes = (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/users',
    schema: {
      operationId: 'getUsers',
      description: 'Get users',
      tags: ['users'],
      response: {
        200: z
          .object({ id: z.string(), name: z.string(), accountId: z.string() })
          .array(),
        // 401: z.object({ error: z.string() }),
      },
    },
    // TODO: preHanlder for authorization checks
    handler: async (_request, reply) => {
      const result = await db
        .selectFrom('user')
        .innerJoin('account', 'account.userId', 'user.id')
        .select(['user.id', 'name', 'account.accountId'])
        .execute();
      reply.send(result);
    },
  });
};
