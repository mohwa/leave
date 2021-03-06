module.exports = {
  clearMocks: true,
  testMatch: ['<rootDir>/tests/**/*.(spec|test).[jt]s?(x)'],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js'],
  transform: {
    '^.+\\.(js|jsx)?$': ['babel-jest', { configFile: './.babelrc-test' }],
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/tests/utils'],
};
