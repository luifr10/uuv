export type UUVCliOptions = {
    baseUrl: string;
    command: "open" | "e2e";
    browser: string;
    targetTestFile: string;
    report: {
        outputDir: string,
        a11y: {
            enabled: boolean,
            outputFile: string
        },
        html: {
            enabled: boolean,
            outputDir: string
        },
        junit: {
            enabled: boolean,
            outputFile: string
        }
    },
    extraArgs: any;
}
