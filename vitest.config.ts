import {defineConfig} from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import dotenv from "dotenv";

dotenv.config({
    path: process.env.NODE_ENV === "test"
        ? ".env.test"
        : ".env"
});

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/tests/setup.ts'],
        projects: [
            {
                extends: true,
                test: {
                    include: ['src/**/*.test.ts'],
                    exclude: ['src/**/*.int.test.ts'],
                    name: 'unit',
                }
            },
            {
                extends: true,
                test: {
                    include: ['src/**/*.int.test.ts'],
                    environment: 'node',
                    name: 'integration',
                    pool: "forks",
                    poolOptions: {
                        forks: {
                            singleFork: true
                        }
                    }
                }
            }
        ]
    }
})