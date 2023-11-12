// Add to post install -> npx appium driver install espresso

async function closeAppiumServer(appiumPort) {
    try {
        console.info('Try close appium server');
        const {killPortProcess} = require('kill-port-process');
        await killPortProcess(appiumPort);
        console.info('Appium server closed');
    } catch (e) {
        console.warn('Can not close appium server')
    }
}

function runE2ETests() {
    process.env['APPIUM_HOME'] = __dirname;
    // TODO Remove minimist if not use
    // const minimist = require("minimist");
    // const argv = minimist(process.argv.slice(2));
    // const automationName = argv.automationName ? argv.automationName: 'espresso';
    const automationName = 'espresso';
    const wdioConfFile = `./wdio.uuv.appium.${automationName}.conf.js`;
    const {Launcher} = require('@wdio/cli');
    const {port} = require(wdioConfFile);
    console.debug(`Running port: ${port}`);
    const wdioLauncher = new Launcher(wdioConfFile);

    wdioLauncher.run().then(async (code) => {
        await closeAppiumServer(port);
        process.exit(code);
    }, (error) => {
        console.error('Launcher failed to start the test');
        console.error(error);
        process.exit(1);
    });
}

runE2ETests();