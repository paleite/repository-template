const { eslintFiles } = require("eslint-files");

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
