import { DataTable, Given, Then } from "@cucumber/cucumber";
import { key } from "@uuv/runner-commons/wording/mobile";
import {
    findWithContent,
    findWithDescription, findWithRoleContent, findWithRoleDescription, findWithRoleDescriptionAndContent,
    not,
} from "./core-engine";
import { XpathSelector } from "./xpath-selector";

Given(`${key.given.reloadApp}`, async function () {
    await driver.reloadSession();
});

Then(`${key.then.element.withContent}`, async function (contentText: string) {
    const foundElement: any =  await findWithContent(contentText);
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then(`${key.then.element.not.withContent}`, async function (contentText: string) {
    const error = await not(() => findWithContent(contentText));
    expect(error).toBeDefined();
});

Then(`${key.then.element.withContentAndAttributes}`, async function (contentText: string, attributes: DataTable) {
    const selector = new XpathSelector()
        .withRole("ComposeNode");

    attributes.rows().forEach(row => {
        const attributeName = row[0];
        const attributeValue = row[1];
        selector.withAttribute(attributeName, attributeValue);
    });

    selector.withChild(
        new XpathSelector()
            .withRole("Text")
            .withAttribute("text", contentText)
    );
    const foundElement:any = $(selector.asString());
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then(`${key.then.element.withDescription}`, async function (accessibleDescription: string) {
    const foundElement: any =  await findWithDescription(accessibleDescription);
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then(`${key.then.element.not.withDescription}`, async function (accessibleDescription: string) {
    const error = await not(() => findWithDescription(accessibleDescription));
    expect(error).toBeDefined();
});

Then(`${key.then.element.withRoleAndContent}`, async function (elementRole: string, contentText: string) {
    const foundElement:any =  await findWithRoleContent(elementRole, contentText);
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then(`${key.then.element.not.withRoleAndContent}`, async function (elementRole: string, contentText: string) {
    const error = await not(() => findWithRoleContent(elementRole, contentText));
    expect(error).toBeDefined();
});

Then(`${key.then.element.withRoleAndDescription}`, async function (elementRole: string, accessibleDescription: string) {
    const foundElement: any =  await findWithRoleDescription(elementRole, accessibleDescription);
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then(`${key.then.element.not.withRoleAndDescription}`, async function (elementRole: string, accessibleDescription: string) {
    const error = await not(() => findWithRoleDescription(elementRole, accessibleDescription));
    expect(error).toBeDefined();
});

Then(`${key.then.element.withRoleAndDescriptionAndContent}`, async function (elementRole: string, accessibleDescription: string, contentText: string) {
    const foundElement: any =  await findWithRoleDescriptionAndContent(elementRole, accessibleDescription, contentText);
    expect(await foundElement.isExisting()).toBeTruthy();
});

Then(`${key.then.element.not.withRoleAndDescriptionAndContent}`, async function (elementRole: string, accessibleDescription: string, contentText: string) {
    const error = await not(() => findWithRoleDescriptionAndContent(elementRole, accessibleDescription, contentText));
    expect(error).toBeDefined();
});
