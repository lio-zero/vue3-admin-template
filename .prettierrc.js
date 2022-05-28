// https://prettier.io/docs/en/index.html
module.exports = {
  semi: false,
  singleQuote: true,
  bracketSpacing: true,
  trailingComma: 'none',
  useTabs: false,
  tabWidth: 2,
  printWidth: 100,
  arrowParens: 'avoid',
  endOfLine: 'auto',
  jsxSingleQuote: true,
  jsxBracketSameLine: true,
  bracketSameLine: false,
  htmlWhitespaceSensitivity: 'strict',
  proseWrap: 'never',
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200
      }
    }
  ]
}
