module.exports = {
  extends: ["eslint-config-prettier/@typescript-eslint", "./rules/typescript"].map(require.resolve),
  rules: {}
};
