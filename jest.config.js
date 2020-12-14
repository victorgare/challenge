module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  modulePaths: ['<rootDir>'],
  testEnvironment: 'node',
  testRegex: './tests/.*\\.(test|spec)?\\.(ts|tsx)',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src'],
  testResultsProcessor: 'jest-sonar-reporter',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  setupFiles: ['dotenv/config'],
  modulePathIgnorePatterns: [
    '<rootDir>/src/interfaces/*',
    '<rootDir>/src/server.ts',
    '<rootDir>/src/config/*',
    '<rootDir>/src/controllers/*'
  ]
};
