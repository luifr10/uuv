/* eslint-disable */
export default {
  displayName: 'runner-cypress',
  preset: '../../jest.preset.js',
  testMatch: [
    '**/*/src/**/*.(spec|test).(js|ts)'
  ],
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  moduleNameMapper: {
    "@uuv/runner-commons": "<rootDir>/../runner-commons/src/index.ts"
  },
  coverageDirectory: '../../coverage/packages/runner-cypress',
};
