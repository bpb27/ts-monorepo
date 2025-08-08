import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getUser } from '../../utils/requests.js';

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
    handler: (request, reply) => {
      const user = getUser(request);
      const greeting = {
        ge: 'Gutentag',
        ja: 'Konichiwa',
        en: 'Hello',
        fr: 'Bonjour',
        es: 'Hola',
      }[request.params.languageCode];
      reply.send({ message: `${greeting}, ${user.name}` });
    },
  });
};
