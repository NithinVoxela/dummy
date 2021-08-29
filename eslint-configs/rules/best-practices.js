module.exports = {
  rules: {
    // Recommended
    curly: ["error", "all"],
    "dot-notation": ["error", { allowKeywords: true }],
    eqeqeq: ["error", "always", { null: "ignore" }],
    "no-case-declarations": "error",
    "no-fallthrough": "warn",
    "no-global-assign": "error",
    "no-octal": "error",
    "no-redeclare": "error",
    "no-self-assign": "error",
    "no-unused-labels": "error",
    "no-useless-catch": "error",
    "no-useless-escape": "error",
    "no-with": "error",

    "accessor-pairs": "off",
    "array-callback-return": "error",
    "block-scoped-var": "error",
    complexity: ["error", 11],
    "consistent-return": "error",
    "default-case": "error",
    "grouped-accessor-pairs": ["error", "getBeforeSet"],
    "guard-for-in": "warn",
    "no-alert": "error",
    "no-caller": "error",
    "no-div-regex": "off",

    // I like this rule, but there's not really a basis to enforce it
    "no-else-return": "off",
    "no-empty-function": [
      "error",
      {
        allow: ["arrowFunctions", "setters", "methods", "constructors"]
      }
    ],
    "no-eq-null": "off",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-implicit-coercion": ["error", { allow: ["!!"] }],
    "no-implicit-globals": "off",
    "no-implied-eval": "error",
    "no-invalid-this": ["error", { capIsConstructor: true }],

    // labels are weird, but we don't ban them
    "no-labels": "off",
    "no-lone-blocks": "error",
    "no-loop-func": "error",

    // I'd like to enable this, but it's probably too difficult to get right
    "no-magic-numbers": "off",
    "no-multi-str": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-octal-escape": "error",

    // this rule might create a lot of noise...
    "no-param-reassign": "error",
    "no-restricted-properties": "off",
    "no-return-assign": "error",
    "no-script-url": "off",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-throw-literal": "error",
    "no-unmodified-loop-condition": "error",
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: false
      }
    ],
    "no-useless-call": "error",
    "no-useless-concat": "error",
    "no-useless-return": "error",
    // void is weird, but i don't see a reason to ban it
    "no-void": "off",
    "no-warning-comments": "off",
    "prefer-regex-literals": "error",
    radix: "error",
    "require-unicode-regexp": "off",
    strict: "off",
    "vars-on-top": "error",
    "wrap-iife": "off",
    yoda: "off"
  }
};
