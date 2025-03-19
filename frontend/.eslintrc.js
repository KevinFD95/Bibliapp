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
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
  ignorePatterns: ["/dist/*"],
};
