/* eslint-disable import/no-extraneous-dependencies, no-unused-vars */
import js from '@eslint/js';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import importResolverAlias from 'eslint-import-resolver-alias';
import importPlugin from 'eslint-plugin-import';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import vueEslintParser from 'vue-eslint-parser';

export default [
  {
    ignores: ['node_modules/', 'dist/', 'build/', 'coverage/', '*.min.js', '*.bundle.js'],
  },

  js.configs.recommended,

  ...pluginVue.configs['flat/recommended'],

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
      'vue/arrow-spacing': 'off',
      'vue/block-spacing': 'off',
      'vue/comma-dangle': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/first-attribute-linebreak': 'off',

      'vue/no-unused-components': 'warn',
      'vue/no-unused-vars': 'warn',
      'vue/no-mutating-props': 'error',
      'vue/require-explicit-emits': 'warn',
      'vue/require-default-prop': 'warn',
      'vue/no-deprecated-slot-attribute': 'error',
      'vue/no-dupe-keys': 'error',
      'vue/no-v-html': 'warn',
    },
  },

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
        browser: 'readonly',
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
          js: 'never',
          mjs: 'never',
          jsx: 'never',
        },
      ],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: {order: 'asc', caseInsensitive: true},
        },
      ],
      'import/newline-after-import': ['warn', {count: 1}],

      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
      'no-param-reassign': 'error',
      'class-methods-use-this': 'off',

      'no-implied-eval': 'warn',
      'no-new-func': 'warn',

      // Неконфликтующие с Prettier правила
      eqeqeq: ['error', 'smart'],
      'consistent-return': 'warn',
      'default-case-last': 'error',
      'no-useless-return': 'warn',
      'no-implicit-coercion': ['warn', {allow: ['!!']}],

      // Отключаем правила, которые могут конфликтoвать с Prettier
      'arrow-body-style': 'off',
      'object-shorthand': 'off',
      'prefer-template': 'off',
      'prefer-destructuring': 'off',
      'prefer-arrow-callback': 'off',
      'space-before-function-paren': 'off',
      'padding-line-between-statements': 'off',
    },
  },

  skipFormatting,
];
