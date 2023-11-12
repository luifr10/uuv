import { Given, Then } from '@cucumber/cucumber';

async function traceElement(name: string, element: any) {
    console.debug(name, element);
    console.debug(name, 'class', element.getAttribute("class"));
    console.debug(name, 'resource-id', await element.getAttribute("resource-id"));
    console.debug(name , 'content-desc', await element.getAttribute("content-desc"));
    console.debug(name, 'text', await element.getAttribute("text"));
    console.debug(name, 'view-tag', await element.getAttribute("view-tag"));
}

async function findInsideText(elementToCheck: WebdriverIO.Element, textContent: string) {
    const foundElementText = await elementToCheck.$(`=${textContent}`);
    await traceElement("foundElementText", foundElementText);
    expect(foundElementText.isExisting()).toBeTruthy();
}

async function elementClassShouldBe(elementToCheck: WebdriverIO.Element, expectedClass: string) {
    const clazzName = await elementToCheck.getAttribute("class");
    expect(clazzName).toBe(expectedClass);
}

Given(`I reset app`, async function () {
    await driver.reloadSession();
});

async function elementClassShouldNotBe(elementToCheck: WebdriverIO.Element, expectedClass: string) {
    const clazzName = await elementToCheck.getAttribute("class");
    expect(clazzName).not.toBe(expectedClass);
}

Given(`I click on a button with description {string} and containing {string}`, async function (accessibleDescription: string, textContent: string) {
    const foundElement = await $(`~${accessibleDescription}`);
    await traceElement("foundElement", foundElement);
    expect(await foundElement.isExisting()).toBeTruthy();
    await elementClassShouldBe(foundElement, "Button");
    await findInsideText(foundElement, textContent);
    await foundElement.click();
});

Given(`I click on a button with description {string}`, async function (accessibleDescription: string) {
    const foundElement = await $(`~${accessibleDescription}`);
    await traceElement("foundElement", foundElement);
    expect(await foundElement.isExisting()).toBeTruthy();
    await elementClassShouldBe(foundElement, "Button");
    await foundElement.click();
});

Then(`I should see a button with description {string} and containing {string}`, async function (accessibleDescription: string, textContent: string) {
    const foundElement = await $(`~${accessibleDescription}`);
    await traceElement("foundElement", foundElement);
    expect(await foundElement.isExisting()).toBeTruthy();
    await elementClassShouldBe(foundElement, "Button");
    await findInsideText(foundElement, textContent);
});

Then(`I should see the following text {string}`, async function (textContent: string) {
    const foundElement = await $(`=${textContent}`);
    await traceElement("foundElement", foundElement);
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then(`I should not see the following text {string}`, async function (textContent: string) {
    let error;
    try {
        const foundElement = await $(`=${textContent}`);
        await foundElement.waitForDisplayed({timeout: 2000});
        error = await foundElement.error;
    } catch (e) {
        error = e;
    }
    expect(error).toBeDefined();
});

Then(`I should see a button with description {string}`, async function (accessibleDescription: string) {
    const foundElement = await $(`~${accessibleDescription}`);
    await traceElement("foundElement", foundElement);
    expect(await foundElement.isExisting()).toBeTruthy();
    await elementClassShouldBe(foundElement, "Button");
});

Then(`I should not see a button with description {string}`, async function (accessibleDescription: string) {
    const foundElement = await $(`~${accessibleDescription}`);
    await traceElement("foundElement", foundElement);
    expect(await foundElement.isExisting()).toBeTruthy();
    await elementClassShouldNotBe(foundElement, "Button");
});