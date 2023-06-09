import type {JestConfigWithTsJest} from 'ts-jest';
import {jsWithTsESM as tsjPreset} from 'ts-jest/presets';

const jestConfig: JestConfigWithTsJest = {
  collectCoverage: true,
  testMatch: ['**/*.spec.ts'],
  preset: 'ts-jest',
  transform: {
    ...tsjPreset.transform,
  },
  transformIgnorePatterns: [
    'node_modules',
  ],
};

export default jestConfig;
