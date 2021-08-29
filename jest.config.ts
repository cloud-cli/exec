export default {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  maxWorkers: 1,
  moduleFileExtensions: ['js', 'ts'],
  preset: 'ts-jest',
  slowTestThreshold: 1,
  testEnvironment: 'jest-environment-node',
  testMatch: ['**/src/*.spec.ts'],
};
