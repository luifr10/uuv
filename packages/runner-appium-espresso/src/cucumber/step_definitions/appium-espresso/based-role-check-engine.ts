import { Given, Then } from "@cucumber/cucumber";
import { key } from "@uuv/runner-commons/wording/mobile";
import {
    findWithRoleContent,
    findWithRoleDescription,
    findWithRoleDescriptionAndContent,
    not
} from "./core-engine";

Given(`${key.then.tap.withRoleAndDescription}`, async function (accessibleDescription: string) {
    const foundElement =  await findWithRoleDescription("$roleId", accessibleDescription);
    await foundElement.click();
});

Given(`${key.then.tap.withRoleAndContent}`, async function (contentText: string) {
    const foundElement: any =  await findWithRoleContent("$roleId", contentText);
    await foundElement.click();
});
Given(`${key.then.tap.withRoleAndDescriptionAndContent}`, async function (accessibleDescription: string, contentText: string) {
    const foundElement:any =  await findWithRoleDescriptionAndContent("$roleId", accessibleDescription, contentText);
    await foundElement.click();
});

Then(`${key.then.element.withRoleAndContent}`, async function (contentText: string) {
    const foundElement: any =  await findWithRoleContent("$roleId", contentText);
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then(`${key.then.element.not.withRoleAndContent}`, async function (contentText: string) {
    const error = await not(() => findWithRoleContent("$roleId", contentText));
    expect(error).toBeDefined();
});

Then(`${key.then.element.withRoleAndDescription}`, async function (accessibleDescription: string) {
    const foundElement: any =  await findWithRoleDescription("$roleId", accessibleDescription);
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then(`${key.then.element.not.withRoleAndDescription}`, async function (accessibleDescription: string) {
    const error = await not(() => findWithRoleDescription("$roleId", accessibleDescription));
    expect(error).toBeDefined();
});

Then(`${key.then.element.withRoleAndDescriptionAndContent}`, async function (accessibleDescription: string, contentText: string) {
    const foundElement: any =  await findWithRoleDescriptionAndContent("$roleId", accessibleDescription, contentText);
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then(`${key.then.element.not.withRoleAndDescriptionAndContent}`, async function (accessibleDescription: string, contentText: string) {
    const error = await not(() => findWithRoleDescriptionAndContent("$roleId", accessibleDescription, contentText));
    expect(error).toBeDefined();
});
