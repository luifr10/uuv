import { Given, Then } from "@cucumber/cucumber";
import { key } from "@uuv/runner-commons/wording/mobile";
import { findWithRoleAndContent, findWithRoleAndDescription, findWithRoleAndDescriptionAndContent } from "./core-engine";

Given(`${key.then.tap.withRoleAndDescription}`, async function (accessibleDescription: string) {
    const foundElement =  await findWithRoleAndDescription("$roleId", accessibleDescription);
    await foundElement.click();
});

Given(`${key.then.tap.withRoleAndContent}`, async function (contentText: string) {
    const foundElement =  await findWithRoleAndContent("$roleId", contentText);
    await foundElement.click();
});
Given(`${key.then.tap.withRoleAndContent}`, async function (accessibleDescription: string, contentText: string) {
    const foundElement =  await findWithRoleAndDescriptionAndContent("$roleId", accessibleDescription, contentText);
    await foundElement.click();
});

Then(`${key.then.element.withRoleAndContent}`, async function (contentText: string) {
    const foundElement =  await findWithRoleAndContent("$roleId", contentText);
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then(`${key.then.element.not.withRoleAndContent}`, async function (contentText: string) {
    const foundElement =  await findWithRoleAndContent("$roleId", contentText);
    expect(await foundElement.isExisting()).toBeFalsy();
});

Then(`${key.then.element.withRoleAndDescription}`, async function (accessibleDescription: string) {
    const foundElement =  await findWithRoleAndDescription("$roleId", accessibleDescription);
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then(`${key.then.element.not.withRoleAndDescription}`, async function (accessibleDescription: string) {
    const foundElement =  await findWithRoleAndDescription("$roleId", accessibleDescription);
    expect(await foundElement.isExisting()).toBeFalsy();
});

Then(`${key.then.element.withRoleAndDescriptionAndContent}`, async function (accessibleDescription: string, contentText: string) {
    const foundElement =  await findWithRoleAndDescriptionAndContent("$roleId", accessibleDescription, contentText);
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then(`${key.then.element.not.withRoleAndDescriptionAndContent}`, async function (accessibleDescription: string, contentText: string) {
    const foundElement =  await findWithRoleAndDescriptionAndContent("$roleId", accessibleDescription, contentText);
    expect(await foundElement.isExisting()).toBeFalsy();
});
