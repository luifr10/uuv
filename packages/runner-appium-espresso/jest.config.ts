/* eslint-disable */
export default {
  displayName: 'runner-appium-espresso',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/runner-appium-espresso',
  testMatch: [
      "<rootDir>/src/**/*.spec.ts"
  ]
};
