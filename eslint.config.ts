import eslintPrettierConfig from 'eslint-config-prettier';
import eslintPrettierPlugin from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint, { type ConfigArray } from 'typescript-eslint';

const config: ConfigArray = tseslint.config(
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        projectService: true,
        // tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  eslintPrettierConfig,
  eslintPrettierPlugin
);

export default config;
