module.exports = {
  '*.{js,jsx,ts,tsx,md}': ['eslint --fix'],
  '*.vue': ['eslint --fix', 'stylelint --fix'],
  '*.{scss,less,html}': ['stylelint --fix'],
}
