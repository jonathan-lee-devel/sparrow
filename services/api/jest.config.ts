import type {JestConfigWithTsJest} from 'ts-jest';
import {jsWithTsESM as tsjPreset} from 'ts-jest/presets';

const jestConfig: JestConfigWithTsJest = {
  collectCoverage: true,
  preset: 'ts-jest',
  transform: {
    ...tsjPreset.transform,
  },
};

export default jestConfig;
