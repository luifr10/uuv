import { Given, Then } from "@cucumber/cucumber";
import { key } from "@uuv/runner-commons/wording/mobile";
import {
    contains,
    findWithContent, findWithDescription,
    not, role
} from "./core-engine";

Given(`${key.then.tap.withRoleAndDescription}`, async function (accessibleDescription: string) {
    const foundElement =  await role(() => findWithDescription(accessibleDescription), "$roleId");
    await foundElement.click();
});

Given(`${key.then.tap.withRoleAndContent}`, async function (contentText: string) {
    const foundElement =  await role(() => findWithContent(contentText), "$roleId");
    await foundElement.click();
});
Given(`${key.then.tap.withRoleAndDescriptionAndContent}`, async function (accessibleDescription: string, contentText: string) {
    const foundElement =  await contains(() => role(() => findWithDescription(accessibleDescription), "$roleId"), contentText);
    await foundElement.click();
});

Then(`${key.then.element.withRoleAndContent}`, async function (contentText: string) {
    const foundElement =  await role(() => findWithContent(contentText), "$roleId");
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then(`${key.then.element.not.withRoleAndContent}`, async function (contentText: string) {
    const error = await not(() => role(() => findWithContent(contentText), "$roleId"));
    expect(error).toBeDefined();
});

Then(`${key.then.element.withRoleAndDescription}`, async function (accessibleDescription: string) {
    const foundElement =  await role(() => findWithDescription(accessibleDescription), "$roleId");
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then(`${key.then.element.not.withRoleAndDescription}`, async function (accessibleDescription: string) {
    const error = await not(() => role(() => findWithDescription(accessibleDescription), "$roleId"));
    expect(error).toBeDefined();
});

Then(`${key.then.element.withRoleAndDescriptionAndContent}`, async function (accessibleDescription: string, contentText: string) {
    const foundElement =  await contains(() => role(() => findWithDescription(accessibleDescription), "$roleId"), contentText);
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then(`${key.then.element.not.withRoleAndDescriptionAndContent}`, async function (accessibleDescription: string, contentText: string) {
    const error = await not(() => contains(() => role(() => findWithDescription(accessibleDescription), "$roleId"), contentText));
    expect(error).toBeDefined();
});
