// @ts-nocheck
/** @type {import("eslint").Linter.Config} */
<<<<<<< HEAD
export const _initialConfig =
{
  "extends": ["next/core-web-vitals", "next/typescript", "prettier",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  "plugins": ["@typescript-eslint", "check-file", "n"],
  "rules": {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { prefer: "type-imports", fixStyle: "inline-type-imports" },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: { attributes: false } },
    ],
=======
export const _initialConfig = {
  extends: ["next/core-web-vitals", "next/typescript", "prettier"],
  plugins: ["check-file", "n"],
  rules: {
>>>>>>> b4ded0ecfa80173630df4c196a866d4e0d413a87
    "prefer-arrow-callback": ["error"],
    "prefer-template": ["error"],
    semi: ["error"],
    quotes: ["error", "double"],
    "n/no-process-env": ["error"],
    "check-file/filename-naming-convention": [
      "error",
      {
        "**/*.{ts,tsx}": "KEBAB_CASE",
      },
      {
        ignoreMiddleExtensions: true,
      },
    ],
    "check-file/folder-naming-convention": [
      "error",
      {
        "src/**/!^[.*": "KEBAB_CASE",
      },
    ],
  },
};
