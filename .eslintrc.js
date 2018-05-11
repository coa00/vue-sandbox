module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2016,
    sourceType: "module"
  },
  extends: ["prettier", "prettier/standard", "plugin:vue/essential"],
  plugins: ["vue", "prettier"],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    "prettier/prettier": "error",
    "no-undef": 1,
    "global-strict": 0,
    "no-underscore-dangle": 0,
    "no-console": 1,
    "no-unused-vars": 1,
    "no-unreachable": 1,
    "no-alert": 0,
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
};
