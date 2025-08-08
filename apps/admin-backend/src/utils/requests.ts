import type { FastifyRequest } from 'fastify';
import { z } from 'zod';

// TODO: define in auth package
const reqUserSchema = z.object({
  sessionData: z.object({
    user: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
    }),
  }),
});

export const getUser = (request: FastifyRequest) => {
  return reqUserSchema.parse(request).sessionData.user;
};
