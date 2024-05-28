module.exports = {
    default: {
        paths: [ 'e2e/*.feature' ],
        require: [ 'src/cucumber/step_definitions/playwright/**/*.{ts,js}' ],
        format: ['html:report/playwright/cucumber-report.html', 'message:report/cucumber-messages.ndjson', 'html:cucumber-report.html'],
        compiler: 'ts:ts-node/register',
        requireModule: ['ts-node/register'],
    },
};
