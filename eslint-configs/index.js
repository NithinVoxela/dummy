module.exports = {
  extends: ["./es5", "./rules/es6", "./rules/imports"].map(require.resolve),
  rules: {}
};
