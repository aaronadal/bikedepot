import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        name: 'app/files-to-lint',
        files: ['src/**/*.ts'],
    },

    {
        name: 'app/files-to-ignore',
        ignores: ['dist/**', 'coverage/**', 'tests/**', 'jest.config.js', '.serverless/**'],
    },

    eslint.configs.recommended,
    tseslint.configs.recommended,

    {
        rules: {
            '@typescript-eslint/no-explicit-any': "off",
            "@typescript-eslint/no-unused-vars": "off",
        }
    }
);
