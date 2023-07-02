import type {JestConfigWithTsJest} from 'ts-jest';
import {jsWithTsESM as tsjPreset} from 'ts-jest/presets';

const jestConfig: JestConfigWithTsJest = {
  collectCoverage: true,
  preset: 'ts-jest/presets/js-with-ts',
  transform: {
    ...tsjPreset.transform,
  },
  transformIgnorePatterns: [
    'node_modules',
  ],
};

export default jestConfig;
