import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { db } from '../../database.js';
import { getSession } from '../../utils/requests.js';

export const setupAuthedRoutes = (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/hello-user/:languageCode',
    schema: {
      operationId: 'sayHelloUser',
      description: 'Says hello in multiple languages',
      tags: ['greetings'],
      params: z.object({
        languageCode: z.enum(['en', 'fr', 'es', 'ge']),
      }),
      response: {
        200: z.object({
          message: z.string(),
        }),
      },
    },
    handler: async (request, reply) => {
      const session = await getSession(request);
      const greeting = {
        ge: 'Gutentag',
        ja: 'Konichiwa',
        en: 'Hello',
        fr: 'Bonjour',
        es: 'Hola',
      }[request.params.languageCode];
      reply.send({ message: `${greeting}, ${session.user.name}` });
    },
  });

  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/users',
    schema: {
      operationId: 'getUsers',
      description: 'Get users',
      tags: ['users'],
      response: {
        200: z
          .object({
            id: z.string(),
            name: z.string(),
          })
          .array(),
      },
    },
    handler: async (_request, reply) => {
      const result = await db
        .selectFrom('user')
        .select(['id', 'name'])
        .execute();
      reply.send(result);
    },
  });
};
