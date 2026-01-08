import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import typescript from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierConfig from 'eslint-config-prettier'

export default [
    {
        ignores: ['node_modules/**', 'dist/**', '.nuxt/**', '.output/**', 'coverage/**']
    },

    // TypeScript files
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                sourceType: 'module',
                ecmaVersion: 'latest'
            }
        },
        plugins: {
            '@typescript-eslint': typescript
        },
        rules: {
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off'
        }
    },

    // Vue files
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                sourceType: 'module',
                ecmaVersion: 'latest'
            }
        },
        plugins: {
            vue,
            '@typescript-eslint': typescript
        },
        rules: {
            // Vue rules
            'vue/multi-word-component-names': 'off',
            'vue/no-v-html': 'warn',
            'vue/require-default-prop': 'off',
            'vue/require-explicit-emits': 'off',
            'vue/html-self-closing': 'off',

            // TypeScript in Vue
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn'
        }
    },

    prettierConfig
]