import { defineConfig } from 'orval';

export default defineConfig({
  userService: {
    input: '../../apps/user-service/api-spec.json',
    output: {
      baseUrl: 'http://localhost:3000',
      target: './src/generated-api-client.ts',
      client: 'react-query',
      httpClient: 'fetch',
    },
    hooks: {
      afterAllFilesWrite: 'biome check --fix --unsafe',
    },
  },
});
