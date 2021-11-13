const { eslintFiles } = require("eslint-files");

/**
 * @typedef {((string) | ((files: string[]) => string | Promise<string>))[]} LintStagedCommand
 * @typedef {Record<string, LintStagedCommand>} LintStagedConfig
 */
/** @type {LintStagedConfig} */
module.exports = {
  "*.js": [
    () => "tsc --project tsconfig.eslint.json",
    "jest --bail --findRelatedTests",
    async (files) =>
      `eslint --config .eslintrc.precommit.js --fix --format codeframe --format codeframe --max-warnings=0 ${await eslintFiles(
        files
      )}`,
    "prettier --write",
  ],
  "*.ts?(x)": [
    () => "yarn run typecheck",
    "jest --bail --findRelatedTests",
    async (files) =>
      `eslint --config .eslintrc.precommit.js --fix --format codeframe --max-warnings=0  ${await eslintFiles(
        files
      )}`,
    "prettier --write",
  ],
};
