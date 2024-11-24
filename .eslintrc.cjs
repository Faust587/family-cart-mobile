module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:react/recommended',
    'eslint:recommended'
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    browser: true,
    es2021: true,
    sourceType: "module"
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  }
}
