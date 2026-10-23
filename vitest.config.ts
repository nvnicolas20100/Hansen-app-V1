import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    include: ['tests/**/*.test.{ts,tsx}'], environment: 'node',
    coverage: {
      provider: 'v8',
      include: ['src/application/**/*.ts','src/domain/**/*.ts','src/persistence/**/*.ts','src/main/{seed,services}.ts','src/renderer/scene/{appearance,camera,scene-model}.ts'],
      exclude: ['src/**/index.ts','src/**/types.ts','src/application/ports.ts'],
      thresholds: { lines: 100, functions: 100, statements: 100, branches: 90, 'src/domain/**': { branches: 95 } },
    },
  },
});
