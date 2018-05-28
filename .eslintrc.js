module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2016,
    sourceType: "module"
  },
  extends: ['eslint:recommended',"prettier", "prettier/standard", "plugin:vue/essential"],
  plugins: ["vue", "prettier","mocha", "jest"],
  env: {
    "mocha": true,
    "jest": true,
    browser: true,
    node: true,
    es6: true
  },
  "globals": {
    "page": true
  },
  rules: {
    "prettier/prettier": "error",
    "no-irregular-whitespace": 0,
    "mocha/no-exclusive-tests": "error",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error"
  }
};
