import { defineConfig } from 'orval';

export default defineConfig({
  userService: {
    input: '../../apps/admin-backend/generated-api-spec.json',
    output: {
      baseUrl: 'http://localhost:3001', // TODO
      target: './src/generated-api-client.ts',
      client: 'react-query',
      httpClient: 'fetch',
      override: {
        fetch: {
          includeHttpResponseReturnType: false,
        },
        mutator: {
          path: './src/custom-fetch.ts',
          name: 'customFetch',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'biome check --fix --unsafe',
    },
  },
});
