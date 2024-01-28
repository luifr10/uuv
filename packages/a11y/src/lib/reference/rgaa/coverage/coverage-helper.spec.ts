import { A11Y_RGAA_REFERENCE } from "../rgaa-reference";

describe("CoverageHelper", () => {
    test("should execute without error", () => {
        const coverage = A11Y_RGAA_REFERENCE.coverage();
        console.log(coverage.topics[4]);
        expect(coverage).toBeTruthy();
    });
});
