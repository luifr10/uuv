import { A11yResultStatus, A11yRuleResult } from "../../src";

export function checkTest(result: A11yRuleResult, idTest: string, status: A11yResultStatus, autoSelectors: string[] = [], manualSelectors: string[] = []) {
  const autoSelectorsExpect = autoSelectors.map(value => {
    return expect.objectContaining({
      selector: value
    });
  });
  const manualSelectorsExpect = manualSelectors.map(value => {
    return expect.objectContaining({
      selector: value
    });
  });

  expect(result).toEqual(expect.objectContaining(
   {
     status: status,
     rule: expect.objectContaining({
       id: idTest
     }),
     validations: [
       expect.objectContaining({
         errorNodes: autoSelectorsExpect,
         nodesToCheckManually: manualSelectorsExpect
       }),
     ]
   })
  );
}
