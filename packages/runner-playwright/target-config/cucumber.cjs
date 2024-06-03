module.exports = {
    default: {
        paths: [ 'uuv/e2e/*.feature' ],
        import: [
            'uuv/cucumber/step_definitions/**/*.{js,ts}',
            'node_modules/@uuv/playwright/dist/cucumber/step_definitions/playwright/**/*.js'
        ]
    },
};
