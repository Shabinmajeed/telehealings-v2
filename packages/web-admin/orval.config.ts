import { defineConfig } from 'orval';

export default defineConfig({
  telehealings: {
    input: {
      target: 'http://localhost:5172/api/docs-json',
    },
    output: {
      mode: 'tags-split',
      target: 'src/api/generated',
      schemas: 'src/api/generated/models',
      client: 'react-query',
      mock: false,
      override: {
        mutator: {
          path: 'src/api/custom-instance.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useMutation: true,
          signal: true,
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
