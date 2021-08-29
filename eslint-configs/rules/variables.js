module.exports = {
  rules: {
    // Recommended
    "no-delete-var": "error",
    "no-shadow-restricted-names": "error",
    "no-undef": "error",
    "no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
        caughtErrors: "none"
      }
    ],

    "init-declarations": "off",
    "no-label-var": "error",
    "no-restricted-globals": "off",
    "no-shadow": "error",
    "no-undef-init": "error",
    "no-undefined": "off",
    "no-use-before-define": ["error", { functions: false, classes: true, variables: true }]
  }
};
