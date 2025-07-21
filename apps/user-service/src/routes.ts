import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

export const setupRoutes = (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/hello/:languageCode',
    schema: {
      operationId: 'sayHello',
      description: 'Says hello in 3 languages',
      tags: ['greetings'],
      querystring: z.object({
        name: z.string().min(1),
      }),
      params: z.object({
        languageCode: z.enum(['en', 'fr', 'es', 'ge']),
      }),
      response: {
        200: z.object({
          message: z.string(),
        }),
      },
    },
    handler: (req, res) => {
      const greeting = {
        ge: 'Guten Tag',
        ja: 'Konichiwa',
        en: 'Hello',
        fr: 'Bonjour',
        es: 'Hola',
      }[req.params.languageCode];
      res.send({ message: `${greeting}, ${req.query.name}` });
    },
  });
};
