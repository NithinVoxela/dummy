module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["react", "react-hooks"],
  settings: {
    react: {
      pragma: "React",
      version: "detect"
    }
  },
  overrides: [
    {
      files: ["*.tsx"],
      rules: {
        "react/default-props-match-prop-types": "off",
        "react/forbid-prop-types": "off",
        "react/forbid-foreign-prop-types": "off",
        "react/no-unused-prop-types": "off",
        "react/prop-types": "off",
        "react/require-default-props": "off"
      }
    }
  ],
  rules: {
    // React specific rules
    "react/boolean-prop-naming": "off",
    "react/button-has-type": "error",
    "react/default-props-match-prop-types": "error",
    "react/destructuring-assignment": ["error", "always"],
    "react/display-name": "error",
    "react/forbid-component-props": ["off", { forbid: [] }],
    "react/forbid-dom-props": ["off", { forbid: [] }],
    "react/forbid-elements": ["off", { forbid: [] }],
    "react/forbid-prop-types": "off",
    "react/forbid-foreign-prop-types": "error",
    "react/no-access-state-in-setstate": "error",
    "react/no-array-index-key": "error",
    "react/no-children-prop": "error",
    "react/no-danger": "error",
    "react/no-danger-with-children": "error",
    "react/no-deprecated": "error",
    "react/no-did-mount-set-state": "error",
    "react/no-did-update-set-state": "error",
    "react/no-direct-mutation-state": "error",
    "react/no-find-dom-node": "error",
    "react/no-is-mounted": "error",
    "react/no-multi-comp": "off",
    "react/no-redundant-should-component-update": "error",
    "react/no-render-return-value": "error",
    "react/no-set-state": "off",
    "react/no-typos": "error",
    "react/no-string-refs": "error",
    "react/no-this-in-sfc": "error",
    "react/no-unescaped-entities": "error",
    "react/no-unknown-property": "error",
    "react/no-unsafe": "error",
    "react/no-unused-prop-types": "error",
    "react/no-unused-state": "error",
    "react/no-will-update-set-state": "error",
    "react/prefer-es6-class": ["error", "always"],
    "react/prefer-read-only-props": "off",
    "react/prefer-stateless-function": "error",
    "react/prop-types": ["error", { skipUndeclared: false }],
    "react/react-in-jsx-scope": "error",
    "react/require-default-props": "off",
    "react/require-optimization": "off",
    "react/require-render-return": "error",
    "react/self-closing-comp": "error",
    "react/sort-comp": "off",
    "react/sort-prop-types": "off",
    "react/state-in-constructor": "off",
    "react/static-property-placement": "off",
    "react/style-prop-object": "error",
    "react/void-dom-elements-no-children": "error",

    // JSX rules
    "react/jsx-boolean-value": ["error", "never"],
    "react/jsx-filename-extension": "off",
    "react/jsx-handler-names": [
      "error",
      {
        eventHandlerPrefix: "handle",
        eventHandlerPropPrefix: "on",
        checkLocalVariables: true
      }
    ],
    "react/jsx-key": ["error", { checkFragmentShorthand: true }],
    "react/jsx-max-depth": "off",
    "react/jsx-no-bind": "off",
    "react/jsx-no-comment-textnodes": "error",
    "react/jsx-no-duplicate-props": ["error", { ignoreCase: true }],
    "react/jsx-no-literals": "off",
    "react/jsx-no-target-blank": "error",
    "react/jsx-no-undef": "error",
    "react/jsx-no-useless-fragment": "error",
    "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
    "react/jsx-fragments": ["error", "syntax"],
    "react/jsx-pascal-case": ["error", { allowAllCaps: true }],
    "react/jsx-props-no-spreading": "off",
    "react/jsx-sort-default-props": "off",
    "react/jsx-sort-props": "off",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
};
