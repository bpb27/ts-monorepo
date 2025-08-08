import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Fastify from 'fastify';
import { setupOpenApi } from '../src/open-api.js';
import { setupAuthedRoutes } from '../src/routes/authed/index.js';
import { setupPublicRoutes } from '../src/routes/public/index.js';

const destinations = {
  apiSpec: '../generated-api-spec.json',
  dbSchema: '../src/generated-database-types.ts',
} as const;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toPath = (p: string) => path.join(__dirname, p);

export const buildApiSpec = async () => {
  // generate DB schema types
  execSync(
    `kysely-codegen --out-file=${toPath(destinations.dbSchema)} --camel-case`
  );

  // build a fastify instance with routes to generate an OpenAPI spec
  const fastify = Fastify({ logger: true });
  await setupOpenApi(fastify);
  setupAuthedRoutes(fastify);
  setupPublicRoutes(fastify);
  await fastify.ready();
  const apiSchema = fastify.swagger();

  // TODO: merge auth schema from better-auth

  // remove the auth handlers that have a star
  if (apiSchema.paths) {
    // biome-ignore lint/performance/noDelete: need to delete this
    delete apiSchema.paths['/api/auth/{*}'];
  }

  // write the spec to a file
  fs.writeFileSync(toPath(destinations.apiSpec), JSON.stringify(apiSchema));
  await fastify.close();
};

buildApiSpec();
