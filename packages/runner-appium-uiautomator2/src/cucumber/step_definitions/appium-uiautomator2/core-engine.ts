import { Given, Then } from "@cucumber/cucumber";

Given("I reset app", async function () {
    await driver.reloadSession();
});

Given("I click on a button with description {string} and containing {string}", async function (accessibleDescription: string, contentText: string) {
    const selector = `new UiSelector().className("android.widget.Button").description("${accessibleDescription}").text("${contentText}")`;
    const foundElement =  await $(`android=${selector}`);
    expect(await foundElement.isExisting()).toBeTruthy();
    await foundElement.click();
});

Given("I click on a button with description {string}", async function (accessibleDescription: string) {
    const selector = `new UiSelector().className("android.widget.Button").description("${accessibleDescription}")`;
    const foundElement =  await $(`android=${selector}`);
    expect(await foundElement.isExisting()).toBeTruthy();
    await foundElement.click();
});

Then("I should see a button with description {string} and containing {string}", async function (accessibleDescription: string, contentText: string) {
    const selector = `new UiSelector().className("android.widget.Button").description("${accessibleDescription}").text("${contentText}")`;
    const foundElement =  await $(`android=${selector}`);
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then("I should see the following text {string}", async function (contentText: string) {
    const selector = `new UiSelector().text("${contentText}")`;
    const foundElement =  await $(`android=${selector}`);
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then("I should not see the following text {string}", async function (contentText: string) {
    const selector = `new UiSelector().text("${contentText}")`;
    const foundElement =  await $(`android=${selector}`);
    expect(await foundElement.isExisting()).toBeFalsy();
});

Then("I should see a button with description {string}", async function (contentText: string) {
    const selector = `new UiSelector().className("android.widget.Button").description("${contentText}")`;
    const foundElement =  await $(`android=${selector}`);
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then("I should not see a button with description {string}", async function (contentText: string) {
    const selector = `new UiSelector().className("android.widget.Button").description("${contentText}")`;
    const foundElement =  await $(`android=${selector}`);
    expect(await foundElement.isExisting()).toBeFalsy();
});
