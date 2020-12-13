module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    modulePaths: ['<rootDir>'],
    testEnviroment: 'node',
    testRegex: './tests/.*\\.(test|spec)?\\.(ts|tsx)',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleDirectories: ['node_modules', 'src'],
    testResultsProcessos: 'jest-sonar-reporter',
    collectCoverageFrom: ['<rootDir>/src/**/*.ts']
  }
};
