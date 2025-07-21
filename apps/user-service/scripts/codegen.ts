import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Fastify from 'fastify';
import { setupOpenApi } from '../src/open-api.js';
import { setupRoutes } from '../src/routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const target = '../api-spec.json';

export const buildApiSpec = async () => {
  const fastify = Fastify({ logger: true });
  await setupOpenApi(fastify);
  setupRoutes(fastify);
  await fastify.ready();
  const swagger = fastify.swagger();
  fs.writeFileSync(path.join(__dirname, target), JSON.stringify(swagger));
  await fastify.close();
};

buildApiSpec();
