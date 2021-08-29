module.exports = {
  env: {
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  rules: {
    // Best Practices (Recommended)
    "no-class-assign": "error",
    "no-empty-pattern": "error",

    // Best Practices
    "class-methods-use-this": "warn",
    "default-param-last": "error",
    "max-classes-per-file": ["error", 1],
    "no-confusing-arrow": ["error", { allowParens: false }],
    "no-constructor-return": "error",
    "no-iterator": "error",
    "no-proto": "error",
    "no-restricted-imports": "off",
    "no-return-await": "error",
    "no-useless-computed-key": "error",
    "no-useless-constructor": "error",
    "no-useless-rename": "error",
    "no-var": "error",
    "object-shorthand": ["error", "properties"],
    "prefer-arrow-callback": [
      "error",
      {
        allowNamedFunctions: true,
        allowUnboundThis: true
      }
    ],
    "prefer-const": [
      "error",
      {
        destructuring: "all",
        ignoreReadBeforeAssign: true
      }
    ],
    "prefer-destructuring": "off",
    "prefer-named-capture-group": "off",
    "prefer-numeric-literals": "error",
    "prefer-promise-reject-errors": ["warn", { allowEmptyReject: true }],
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "off",
    "require-await": "off",
    "symbol-description": "error",

    // Errors (Recommended)
    "constructor-super": "error",
    "no-async-promise-executor": "error",
    "no-const-assign": "error",
    "no-dupe-class-members": "error",
    "no-irregular-whitespace": ["error", { skipComments: true, skipRegExps: true, skipTemplates: true }],
    "no-new-symbol": "error",
    "no-this-before-super": "error",
    "require-atomic-updates": "error",
    "require-yield": "error",

    // Errors
    "no-await-in-loop": "off",
    "no-duplicate-imports": "off",
    "no-import-assign": "error",

    // Style
    "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
    "prefer-exponentiation-operator": "error",
    "prefer-object-spread": "off",
    // using import plugin instead
    "sort-imports": "off",

    // es6 overrides
    "block-scoped-var": "off",
    "one-var": "off",
    "no-invalid-this": ["error", { capIsConstructor: false }]
  }
};
