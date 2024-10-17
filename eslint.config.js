import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  { ignores: ["dist/*", "node_modules/*"] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
