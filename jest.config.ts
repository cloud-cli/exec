export default {
  cache: true,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  maxWorkers: 1,
  preset: 'ts-jest',
  transform: {},
  extensionsToTreatAsEsm: ['.ts'],
  slowTestThreshold: 1,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
