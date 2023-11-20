export async function findWithContent(contentText: string) {
    const selector = `new UiSelector().text("${contentText}")`;
    return $(`android=${selector}`);
}

export async function findWithDescription(accessibleDescription: string) {
    const selector = `new UiSelector().description("${accessibleDescription}")`;
    return $(`android=${selector}`);
}

export async function findWithRoleAndContent(elementRole: string, contentText: string) {
    const selector = `new UiSelector().className("android.widget.${elementRole}").text("${contentText}")`;
    return $(`android=${selector}`);
}

export async function findWithRoleAndDescription(elementRole: string, accessibleDescription: string) {
    const selector = `new UiSelector().className("android.widget.${elementRole}").description("${accessibleDescription}")`;
    return $(`android=${selector}`);
}

export async function findWithRoleAndDescriptionAndContent(elementRole: string, accessibleDescription: string, contentText: string) {
    const selector = `new UiSelector().className("android.widget.${elementRole}").description("${accessibleDescription}").text("${contentText}")`;
    return $(`android=${selector}`);
}
