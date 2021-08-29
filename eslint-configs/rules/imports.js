module.exports = {
  env: {
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  plugins: ["import"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".mjs", ".js", ".json"]
      }
    },
    "import/extensions": [".js", ".mjs", ".jsx"],
    "import/core-modules": [],
    "import/ignore": ["node_modules", "\\.(coffee|scss|css|less|hbs|svg|json)$"]
  },

  rules: {
    // Static analysis
    "import/no-unresolved": ["error", { commonjs: true, caseSensitive: true }],
    "import/named": "error",
    "import/default": "error",
    "import/namespace": ["error", { allowComputed: true }],
    "import/no-restricted-paths": "off",
    "import/no-absolute-path": "error",
    "import/no-dynamic-require": "off",
    "import/no-internal-modules": "off",
    "import/no-webpack-loader-syntax": "off",
    "import/no-self-import": "error",
    "import/no-cycle": ["error", { maxDepth: 1 }],
    "import/no-useless-path-segments": ["error", { noUselessIndex: true }],
    "import/no-relative-parent-imports": "off",
    "import/no-unused-modules": "off",

    // Helpful warnings
    "import/export": "error",
    "import/no-named-as-default": "error",
    "import/no-named-as-default-member": "error",
    // this is a good rule, but it's not complete
    "import/no-deprecated": "off",
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: true, optionalDependencies: true, peerDependencies: true }
    ],
    "import/no-mutable-exports": "error",

    // Module systems
    "import/unambiguous": "off",
    "import/no-commonjs": "off",
    "import/no-amd": "error",
    "import/no-nodejs-modules": "off",

    // Style guide
    "import/first": "error",
    "import/exports-last": "off",
    "import/no-duplicates": "error",
    "import/no-namespace": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        mjs: "never",
        ts: "never",
        tsx: "never"
      }
    ],
    "import/order": ["error", { groups: [["builtin", "external", "internal"]] }],
    "import/newline-after-import": "error",
    "import/prefer-default-export": "off",
    "import/max-dependencies": "off",
    "import/no-unassigned-import": ["error", { allow: ["**/*.scss", "**/*.less", "**/*.css"] }],
    "import/no-named-default": "off",
    "import/no-default-export": "error",
    "import/no-named-export": "off",
    "import/no-anonymous-default-export": "off",
    "import/group-exports": "off",
    "import/dynamic-import-chunkname": "off"
  }
};
