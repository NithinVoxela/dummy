module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: { sourceType: "module" },
  plugins: ["@typescript-eslint"],
  rules: {
    // Recommended
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/ban-types": "off",
    camelcase: "off",
    "@typescript-eslint/naming-convention": ["error",
      {
        selector: "class",
        format: ["PascalCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "interface",
        format: ["PascalCase"],
        prefix: ["I"],
      },
      {
        selector: "default",
        format: ["camelCase", "UPPER_CASE", "PascalCase"]
      },
      {
        selector: "parameter",
        format: ["camelCase", "PascalCase"],
        leadingUnderscore: "allow"
      },
      {
        selector: "memberLike",
        modifiers: ["private"],
        format: ["camelCase"],
        leadingUnderscore: "require"
      },
      {
        selector: "typeLike",
        format: ["PascalCase"]
      }
    ],
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "no-array-constructor": "off",
    "@typescript-eslint/no-array-constructor": "error",
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": [
      "error",
      {
        allow: [
          "arrowFunctions",
          "setters",
          "methods",
          "constructors",
          "protected-constructors",
          "private-constructors"
        ]
      }
    ],
    "@typescript-eslint/no-explicit-any": ["error", { fixToUnknown: true, ignoreRestArgs: true }],
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-this-alias": ["error", { allowDestructuring: true, allowedNames: ["self"] }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
        caughtErrors: "none"
      }
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true, typedefs: false }
    ],
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/prefer-namespace-keyword": "off",
    "@typescript-eslint/triple-slash-reference": "error",

    "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/explicit-member-accessibility": "error",
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/no-dynamic-delete": "error",
    "@typescript-eslint/no-extra-non-null-assertion": "error",
    "@typescript-eslint/no-extraneous-class": "off",
    "@typescript-eslint/no-floating-promises": ["error", { ignoreVoid: true }],
    "@typescript-eslint/no-for-in-array": "error",
    "no-magic-numbers": "off",
    "@typescript-eslint/no-magic-numbers": "off",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/no-parameter-properties": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-type-alias": "off",
    "@typescript-eslint/no-unnecessary-condition": ["error", { allowConstantLoopConditions: true }],
    "@typescript-eslint/no-unnecessary-qualifier": "off",
    "@typescript-eslint/no-unnecessary-type-arguments": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/no-untyped-public-signature": "off",
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: false
      }
    ],
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/prefer-for-of": "off",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/prefer-readonly": "error",
    "@typescript-eslint/prefer-regexp-exec": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/promise-function-async": "off",
    "@typescript-eslint/require-array-sort-compare": "off",
    "require-await": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/restrict-plus-operands": "error",
    "@typescript-eslint/restrict-template-expressions": "error",
    "@typescript-eslint/return-await": "error",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/typedef": "off",
    "@typescript-eslint/unbound-method": [
      "error",
      {
        ignoreStatic: true
      }
    ],
    "@typescript-eslint/unified-signatures": "error"
  },
  // taken from https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended.json
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        //Checked by Typescript - ts(2378)
        "getter-return": "off",
        // Checked by Typescript - ts(2300)
        "no-dupe-args": "off",
        // Checked by Typescript - ts(1117)
        "no-dupe-keys": "off",
        // Checked by Typescript - ts(7027)
        "no-unreachable": "off",
        // Checked by Typescript - ts(2367)
        "valid-typeof": "off",
        // Checked by Typescript - ts(2588)
        "no-const-assign": "off",
        // Checked by Typescript - ts(2588)
        "no-new-symbol": "off",
        // Checked by Typescript - ts(2376)
        "no-this-before-super": "off",
        // This is checked by Typescript using the option `strictNullChecks`.
        "no-undef": "off",
        // This is already checked by Typescript.
        "no-dupe-class-members": "off",
        // This is already checked by Typescript.
        "no-redeclare": "off"
      }
    }
  ]
};
