module.exports = {
  extends: ["eslint-config-prettier/react", "./rules/react"].map(require.resolve),
  rules: {}
};
