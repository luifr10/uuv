import { Given, Then } from "@cucumber/cucumber";
import { key } from "@uuv/runner-commons/wording/mobile";
import {
    contains,
    findWithContent,
    findWithDescription, not, role
} from "./core-engine";

Given(`${key.given.reloadApp}`, async function () {
    await driver.reloadSession();
});

Then(`${key.then.element.withContent}`, async function (contentText: string) {
    const foundElement =  await findWithContent(contentText);
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then(`${key.then.element.not.withContent}`, async function (contentText: string) {
    const error = await not(() => findWithContent(contentText));
    expect(error).toBeDefined();

});

Then(`${key.then.element.withDescription}`, async function (accessibleDescription: string) {
    const foundElement =  await findWithDescription(accessibleDescription);
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then(`${key.then.element.not.withDescription}`, async function (accessibleDescription: string) {
    const error = await not(() => findWithDescription(accessibleDescription));
    expect(error).toBeDefined();
});

Then(`${key.then.element.withRoleAndContent}`, async function (elementRole: string, contentText: string) {
    const foundElement =  await role(() => findWithContent(contentText), elementRole);
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then(`${key.then.element.not.withRoleAndContent}`, async function (elementRole: string, contentText: string) {
    const error = await not(() => role(() => findWithContent(contentText), elementRole));
    expect(error).toBeDefined();
});

Then(`${key.then.element.withRoleAndDescription}`, async function (elementRole: string, accessibleDescription: string) {
    const foundElement =  await role(() => findWithDescription(accessibleDescription), elementRole);
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then(`${key.then.element.not.withRoleAndDescription}`, async function (elementRole: string, accessibleDescription: string) {
    const error = await not(() => role(() => findWithDescription(accessibleDescription), elementRole));
    expect(error).toBeDefined();
});

Then(`${key.then.element.withRoleAndDescriptionAndContent}`, async function (elementRole: string, accessibleDescription: string, contentText: string) {
    const foundElement =  await contains(() => role(() => findWithDescription(accessibleDescription), elementRole), contentText);
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then(`${key.then.element.not.withRoleAndDescriptionAndContent}`, async function (elementRole: string, accessibleDescription: string, contentText: string) {
    const error = await not(() => contains(() => role(() => findWithDescription(accessibleDescription), elementRole), contentText));
    expect(error).toBeDefined();
});
