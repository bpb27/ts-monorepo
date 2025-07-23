import type { FastifyRequest } from 'fastify';
import { auth } from '../auth.js';

/**
 * Converts FastifyRequest headers to a standard Headers object.
 * Necessary for compatibility with better-auth and other libraries.
 * @param headers The FastifyRequest headers to convert.
 * @returns A standard Headers object.
 */
export const toStandardHeaders = (
  headers: FastifyRequest['headers']
): Headers => {
  const standardHeaders = new Headers();
  Object.entries(headers).forEach(([key, value]) => {
    if (value) {
      standardHeaders.append(key, value.toString());
    }
  });
  return standardHeaders;
};

/**
 * Converts a FastifyRequest to a standard Request object.
 * Necessary for compatibility with better-auth and other libraries.
 * @param request The FastifyRequest to convert.
 * @returns A standard Request object.
 */
export const toStandardRequest = (request: FastifyRequest): Request => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  return new Request(url.toString(), {
    method: request.method,
    headers: toStandardHeaders(request.headers),
    body: request.body ? JSON.stringify(request.body) : undefined,
  });
};

/**
 * Retrieves the session from the request headers.
 * Only call this within an authed route, or it will throw.
 * @param request The FastifyRequest to retrieve the session from.
 * @returns The session object.
 * @throws {Error} If no session is found.
 */
export const getSession = async (request: FastifyRequest) => {
  const headers = toStandardHeaders(request.headers);
  const session = await auth.api.getSession({ headers });
  if (!session) {
    throw new Error('No session found');
  }
  return session;
};
