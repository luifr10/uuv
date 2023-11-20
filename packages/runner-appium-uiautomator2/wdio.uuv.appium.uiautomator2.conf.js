const { join } =  require("path");

const port = 9090;

exports.config = {
    runner: "local",
    reporters: [
        [
            "spec",
            {
                showPreface: false,
            }
        ]
    ],
    logLevel: "debug",
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/applitools-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: "http://the-internet.herokuapp.com",
    // Default timeout for all waitFor* commands.
    /**
     * NOTE: This has been increased for more stable Appium Native app
     * tests because they can take a bit longer.
     */
    waitforTimeout: 45000,
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    // Default request retries count
    connectionRetryCount: 3,
    services: [
        [
            "appium",
            {
                args: {
                    address: "127.0.0.1",
                    port: port
                },
                logPath: "./"
            }
        ]
    ],
    framework: "cucumber",
    specs: [
        "./tests/e2e/**/*.feature",
    ],
    capabilities: [
        {
            // The defaults you need to have in your config
            platformName: "Android",
            maxInstances: 1,
            // For W3C the appium capabilities need to have an extension prefix
            // http://appium.io/docs/en/writing-running-appium/caps/
            // This is `appium:` for all Appium Capabilities which can be found here
            // 'appium:deviceName': 'Pixel_3_10.0',
            "appium:deviceName": "Pixel_3a_API_34_extension_level_7_x86_64",
            // 'appium:platformVersion': '14',
            // 'appium:orientation': 'PORTRAIT',
            "appium:automationName": "UiAutomator2",
            // The path to the app
            "appium:app": join(__dirname, "./tests/apps/mmvm-simple-app-debug.apk"),
            "appium:fullReset": true,
            // 'appium:appWaitActivity': 'MainActivity',
            // 'appium:appWaitPackage': 'com.example.mvvm_simple_app',
            "appium:newCommandTimeout": 240,
            "appium:autoGrantPermissions": true,
            // 'appium:settings[ignoreUnimportantViews]': true,
            // 'appium:settings[allowInvisibleElements]': false,
            // commandTimeout: 240
        },
    ],
    cucumberOpts: {
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> module used for processing required features
        requireModule: [],
        // <boolean< Treat ambiguous definitions as errors
        failAmbiguousDefinitions: true,
        // <boolean> invoke formatters without executing steps
        // dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <boolean> Enable this config to treat undefined definitions as
        // warnings
        ignoreUndefinedDefinitions: false,
        // <string[]> ("extension:module") require files with the given
        // EXTENSION after requiring MODULE (repeatable)
        names: [],
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <string[]> (name) specify the profile to use
        profile: [],
        scenarioLevelReporter: false,
        order: "defined",
        // <string> specify a custom snippet syntax
        // snippetSyntax: undefined,
        // <boolean> fail if there are any undefined or pending steps
        strict: true,
        // <string> (expression) only execute the features or scenarios with
        // tags matching the expression, see
        // https://docs.cucumber.io/tag-expressions/
        tagExpression: "not @Pending",
        // <boolean> add cucumber tags to feature or scenario name
        tagsInTitle: false,
        // <number> timeout for step definitions
        timeout: 20000,
        // <string[]> (file/dir) require files before executing features
        require: [
            "./src/cucumber/step_definitions/appium-uiautomator2/generated/**/*.ts",
        ]
    }
};

exports.port = port;
