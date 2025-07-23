import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Fastify from 'fastify';
// import { auth } from "../src/auth.js";
import { setupOpenApi } from '../src/open-api.js';
import { setupAuthedRoutes } from '../src/routes/authed/index.js';
import { setupPublicRoutes } from '../src/routes/public/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const target = '../api-spec.json';

export const buildApiSpec = async () => {
  const fastify = Fastify({ logger: true });
  await setupOpenApi(fastify);
  setupAuthedRoutes(fastify);
  setupPublicRoutes(fastify);
  await fastify.ready();
  const apiSchema = fastify.swagger();
  // const authSchema = await auth.api.generateOpenAPISchema();
  // apiSchema.components = {
  // 	schemas: {
  // 		...apiSchema.components.schemas,
  // 		...authSchema.components.schemas,
  // 	},
  // 	securitySchemes: authSchema.components.securitySchemes,
  // };

  // apiSchema.security = authSchema.security;
  // apiSchema.servers = authSchema.servers;

  // apiSchema.paths = {
  // 	...apiSchema.paths,
  // 	...authSchema.paths,
  // };

  if (apiSchema.paths) {
    // biome-ignore lint/performance/noDelete: need to delete this
    delete apiSchema.paths['/api/auth/{*}'];
  }

  fs.writeFileSync(path.join(__dirname, target), JSON.stringify(apiSchema));
  await fastify.close();
};

buildApiSpec();
