module.exports = {
    preset: 'ts-jest/presets/default-esm',
    transform: {
        '^.+\\.(js|jsx)$': ['ts-jest', {'useESM': true}]
    },
    testEnvironment: 'node',
    collectCoverage: true,
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
};
