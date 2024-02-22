/* eslint-disable */
export default {
  displayName: '@uuv/a11y',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['./jest-setup.js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/a11y',
  reporters: [
    "default",
    [
      "jest-junit",
      {
        "outputDirectory": "./reports",
        "outputName": "junit-report.xml",
      }
    ]
  ]
};
