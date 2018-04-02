module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  env: {
    node: true,
    'jest/globals': true
  },
  plugins: ['jest']
};
