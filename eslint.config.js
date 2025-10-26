/* eslint-disable import/no-extraneous-dependencies, no-unused-vars */
import globals from 'globals';
import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import importPlugin from 'eslint-plugin-import';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import vueEslintParser from 'vue-eslint-parser';
import importResolverAlias from 'eslint-import-resolver-alias';

export default [
  {
    ignores: ['node_modules/', 'dist/', 'build/', 'coverage/', '*.min.js', '*.bundle.js'],
  },

  js.configs.recommended,

  // Расширяем конфиг Vue. Используем оператор расширения (...)
  // для вставки содержимого массива
  ...pluginVue.configs['flat/recommended'],

  // Конфигурация для файлов Vue
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.webextensions,
      },
    },
    rules: {
      // Правила, которые могут конфликтовать с Prettier
      'vue/arrow-spacing': 'off',
      'vue/block-spacing': 'off',
      'vue/comma-dangle': 'off',
      'vue/max-attributes-per-line': 'off',
    },
  },

  // Конфигурация для JavaScript-файлов
  {
    files: ['**/*.js', '**/*.mjs'],
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        },
      },
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.webextensions,
        $: 'readonly',
        browser: 'readonly',
        driver: 'readonly',
        $$: 'readonly',
        expect: 'readonly',
        allure: 'readonly',
      },
    },
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/test/**/*.js',
            '**/*.test.js',
            '**/wdio.conf*.js',
            '**/*.config.js',
            '**/allure.config.js',
            '**eslint*',
          ],
        },
      ],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'always',
          mjs: 'always',
        },
      ],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-param-reassign': 'error',
      'class-methods-use-this': 'off',
      // Отключаем правила, которые могут конфликтовать с Prettier
      'arrow-body-style': 'off',
      'object-shorthand': 'off',
      'prefer-template': 'off',
      'prefer-destructuring': 'off',
      'prefer-arrow-callback': 'off',
      'space-before-function-paren': 'off',
      'padding-line-between-statements': 'off',
    },
  },

  // Правила для тестовых файлов (если применимо)
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    rules: {
      'no-console': 'off',
      'max-len': ['error', { code: 120 }],
    },
  },

  skipFormatting,
];
