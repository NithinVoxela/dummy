module.exports = {
  extends: [
    "eslint-config-prettier",
    "./rules/errors",
    "./rules/best-practices",
    "./rules/variables",
    "./rules/style"
  ].map(require.resolve),
  rules: {}
};
