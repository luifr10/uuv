export class XpathSelector {
    private role!: string;
    private attributes: Map<string, string> = new Map<string, string>();
    private child?: XpathSelector;

    public withRole(role: string): this {
        this.role = role;
        return this;
    }

    public withAttribute(attrName: string, attrValue: string): this {
        this.attributes.set(attrName, attrValue);
        return this;
    }

    public withText(textValue: string): this {
        return this.withAttribute("text", textValue);
    }

    public withDescription(contentDescription: string): this {
        return this.withAttribute("content-desc", contentDescription);
    }

    public withChild(childSelector: XpathSelector): this {
        this.child = childSelector;
        return this;
    }

    public asString(isChild = false): string {
        if (!this.role) {
            throw new Error("No role specified for the selector");
        }

        let selectorStr = `${isChild ? "" : "//"}${this.role}`;

        if (this.attributes.size) {
            selectorStr = `${selectorStr}[${this.printAttribute()}]`;
        }

        if (this.child) {
            selectorStr = `${selectorStr}/${this.child.asString(true)}`;
        }

        return selectorStr;
    }

    private printAttribute(): string {
        let attributesStr;
        this.attributes.forEach((value: string, key: string) => {
            const prefix = attributesStr ? `${attributesStr} and ` : "";
            attributesStr = `${prefix}@${key}="${value}"`;
        });
        return attributesStr;
    }
}
