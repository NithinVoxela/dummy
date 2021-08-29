module.exports = {
  root: true,
  settings: {
    "import/resolver": {
      typescript: {},
    }
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json"
  },
  plugins: ["import"],
  extends: ["./eslint-configs", "./eslint-configs/react", "./eslint-configs/typescript"],
  rules: {
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        },
        groups: [["external", "builtin"], "internal", ["parent", "sibling", "index"]],
        "newlines-between": "always"
      }
    ],
    // TODO: added as tech debt
    "@typescript-eslint/no-explicit-any": "off",
    // this rule will be reverified after fixing errors for 'strictNullChecks = true' in tsc
    "@typescript-eslint/no-unnecessary-condition": "off",
    // 'this' is being flagged inside class instance methods
    "no-invalid-this": "off",
    // replaced by eslint rule: '@typescript-eslint/no-shadow': 'error'
    "no-shadow": "off",
    // no-underscore-dangle conflicts with naming-convention rule for _private variables
    "no-underscore-dangle": "off"
  }
};