const typescriptProjects = ["./tsconfig.json", "./tsconfig.eslint.json"];

/** @type import("eslint").Linter.Config<import("eslint").Linter.RulesRecord> */
const config = {
  root: true,
  env: {
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: { project: typescriptProjects, tsconfigRootDir: __dirname },
  plugins: ["@typescript-eslint"],
  rules: {},
};

/** @type import("eslint").Linter.ConfigOverride<import("eslint").Linter.RulesRecord>[] */
const overrides = [
  {
    /**
     * This following rules can't be used on JavaScript in codebases with
     * mixed JS/TS, so we turn them off on all `.js`-files
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/aee723813ec47ccac0a165cf1bc9674f6257b609/packages/eslint-plugin/docs/rules/explicit-function-return-type.md#configuring-in-a-mixed-jsts-codebase
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/aee723813ec47ccac0a165cf1bc9674f6257b609/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md#configuring-in-a-mixed-jsts-codebase
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/1f3c34426cea6d04df2393032e0728ade7390d3c/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md#configuring-in-a-mixed-jsts-codebase
     */
    files: ["*.js"],

    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-member-accessibility": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-implicit-any-catch": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
    },
  },

  {
    /**
     * Configurations in project root
     */
    files: ["./*.js"],

    env: {
      node: true,
    },

    rules: {
      "@typescript-eslint/no-var-requires": "off",
    },
  },

  {
    /**
     * Jest recommended rules for all files jest would match
     * NB: This might conflict with other test-frameworks
     */
    files: ["*.test.js", "*.test.ts", "*.test.tsx"],

    extends: ["plugin:jest/recommended"],
  },
];

module.exports = { ...config, overrides };
