// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  
  extends: [
    "expo",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "prettier/prettier": ["error"],
    "react/react-in-jsx-scope": "off",
  },
  ignorePatterns: ["/dist/*"],
};
