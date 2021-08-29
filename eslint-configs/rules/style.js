module.exports = {
  plugins: ["prettier"],
  rules: {
    // Recommended
    camelcase: ["error", { properties: "always", ignoreDestructuring: false, ignoreImports: true }],
    "capitalized-comments": "off",
    "consistent-this": ["error", "self"],
    "func-name-matching": [
      "error",
      "always",
      {
        includeCommonJSModuleExports: false,
        considerPropertyDescriptor: true
      }
    ],
    "func-names": ["error", "as-needed"],
    "func-style": ["error", "expression"],
    "id-blacklist": "off",
    "id-length": "off",
    "id-match": "off",
    "line-comment-position": "off",
    "lines-around-comment": "off",
    "max-depth": ["off", 4],
    "max-len": "off",
    "max-lines": [
      "off",
      {
        max: 300,
        skipBlankLines: true,
        skipComments: true
      }
    ],
    "max-lines-per-function": [
      "off",
      {
        max: 50,
        skipBlankLines: true,
        skipComments: true,
        IIFEs: true
      }
    ],
    "max-nested-callbacks": "off",
    "max-params": "off",
    "max-statements": "off",
    "max-statements-per-line": ["error", { max: 1 }],
    "multiline-comment-style": "off",
    "new-cap": [
      "error",
      {
        newIsCap: true,
        capIsNew: false
      }
    ],
    "no-array-constructor": "error",
    "no-bitwise": "off",
    "no-continue": "off",
    "no-inline-comments": "off",
    "no-lonely-if": "error",
    "no-mixed-operators": "off",
    "no-multi-assign": "off",
    "no-negated-condition": "error",
    "no-nested-ternary": "error",
    "no-new-object": "error",
    "no-plusplus": "off",
    "no-restricted-syntax": "off",
    "no-tabs": "off",
    "no-ternary": "off",
    "no-underscore-dangle": [
      "error",
      {
        allowAfterThis: true,
        allowAfterSuper: true,
        enforceInMethodNames: false
      }
    ],
    "no-unneeded-ternary": ["error", { defaultAssignment: false }],
    "one-var": ["error", { initialized: "always", uninitialized: "never" }],
    "one-var-declaration-per-line": ["error", "initializations"],
    "operator-assignment": ["error", "always"],
    "padding-line-between-statements": "off",
    quotes: "off",
    "sort-keys": "off",
    "sort-vars": "off",
    "spaced-comment": [
      "error",
      "always",
      {
        line: {
          exceptions: ["-", "+"],
          markers: ["=", "!", "/"]
        },
        block: {
          exceptions: ["-", "+"],
          markers: ["=", "!", ":", "::"],
          balanced: true
        }
      }
    ],

    "prettier/prettier": "error"
  }
};
