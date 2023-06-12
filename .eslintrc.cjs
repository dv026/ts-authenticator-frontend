/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    "no-useless-escape": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unnecessary-type-constraint": "off",
    "no-extra-boolean-cast": "off",
    "no-empty": "off",
    "no-prototype-builtins": "off",
    "no-empty-pattern": "off",
    "@typescript-eslint/no-inferrable-types": "off",
  },
}
