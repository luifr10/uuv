export async function traceElement(name: string, element: any) {
    console.debug(name, element);
    console.debug(name, "class", element.getAttribute("class"));
    console.debug(name, "resource-id", await element.getAttribute("resource-id"));
    console.debug(name, "content-desc", await element.getAttribute("content-desc"));
    console.debug(name, "text", await element.getAttribute("text"));
    console.debug(name, "view-tag", await element.getAttribute("view-tag"));
}

export async function findInsideText(elementToCheck: WebdriverIO.Element, textContent: string) {
    const foundElementText = await elementToCheck.$(`=${textContent}`);
    await traceElement("foundElementText", foundElementText);
    expect(foundElementText.isExisting()).toBeTruthy();
}

export async function elementClassShouldBe(elementToCheck: WebdriverIO.Element, expectedClass: string) {
    const clazzName = await elementToCheck.getAttribute("class");
    expect(clazzName).toBe(expectedClass);
}

export async function elementClassShouldNotBe(elementToCheck: WebdriverIO.Element, expectedClass: string) {
    const clazzName = await elementToCheck.getAttribute("class");
    expect(clazzName).not.toBe(expectedClass);
}

export async function findWithContent(contentText: string) {
    return $(`=${contentText}`);
}

export async function findWithDescription(accessibleDescription: string) {
    return $(`~${accessibleDescription}`);
}

export async function not(selectorFn: () => Promise<WebdriverIO.Element>): Promise<any> {
    let error;
    try {
        const foundElement =  await selectorFn();
        error = await foundElement.error;
    } catch (e) {
        error = e;
    }
    return error;
}

export async function role(selectorFn: () => Promise<WebdriverIO.Element>, expectedRole: string): Promise<WebdriverIO.Element> {
    const foundElement = await selectorFn();
    await traceElement("foundElement", foundElement);
    expect(await foundElement.isExisting()).toBeTruthy();
    await elementClassShouldBe(foundElement, expectedRole);
    return foundElement;
}

export async function contains(selectorFn: () => Promise<WebdriverIO.Element>, expectedTextContent: string): Promise<WebdriverIO.Element> {
    const foundElement = await selectorFn();
    await traceElement("foundElement", foundElement);
    expect(await foundElement.isExisting()).toBeTruthy();
    await findInsideText(foundElement, expectedTextContent);
    return foundElement;
}
