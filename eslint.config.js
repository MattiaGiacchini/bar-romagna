import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import typescript from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import eslintRecommended from '@eslint/js' // ESLint recommended rules
import prettierConfig from 'eslint-config-prettier' // Prettier configuration

export default [
    // Basic ESLint rules for JavaScript
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module'
        },
        ...eslintRecommended.configs.recommended
    },

    // Rules for Vue files
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsParser, // Use TypeScript parser inside Vue
                sourceType: 'module',
                ecmaVersion: 'latest',
                extraFileExtensions: ['.vue'],
                project: './tsconfig.json'
            }
        },
    },

    // Rules for TypeScript files
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                sourceType: 'module',
                ecmaVersion: 'latest',
                project: './tsconfig.eslint.json'
            }
        },
        plugins: { '@typescript-eslint': typescript },
        rules: {
            ...typescript.configs.recommended.rules
        }
    },

    {
        ...prettierConfig
    }
]

// Ignore unnecessary files
export const ignores = ['node_modules', 'dist', 'tests', 'coverage', 'public', '.vscode']