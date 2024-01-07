import { A11yResult, A11yResultStatus, A11yRuleResult } from "../model/result";
import { A11Y_RGAA_REFERENCE } from "../reference";

describe("Result", () => {
  const fakeUrl = "fakeUrl";

  function buildA11RuleResult(input: any) {
    return Object.assign(new A11yRuleResult(fakeUrl, A11Y_RGAA_REFERENCE.rules[0]), {
      ...input
    });
  }

  it("compute returns success only if all validations are successful", async () => {
    const result: A11yResult = Object.assign(new A11yResult(fakeUrl, A11Y_RGAA_REFERENCE), {
      ruleResults: [
        buildA11RuleResult({
          rule: {
            id: "1.1.1"
          },
          validations: [
            {
              "status": "success"
            },
            {
              "status": "success"
            }
          ]
        }),
        buildA11RuleResult( {
          rule: {
            id: "1.1.1"
          },
          validations: [
            {
              "status": "success"
            }
          ]
        }),
        buildA11RuleResult( {
          rule: {
            id: "1.1.2"
          },
          validations: [
            {
              "status": "success"
            }
          ]
        }),
        buildA11RuleResult( {
          rule: {
            id: "1.2.2"
          },
          validations: [
            {
              "status": "success"
            }
          ]
        }),
        buildA11RuleResult( {
          rule: {
            id: "8.1.1"
          },
          validations: [
            {
              "status": "success"
            }
          ]
        })
      ]
    });
    result.computeStatus();
    const summary = result.summary();
    expect(result).toMatchObject({
      status: A11yResultStatus.SUCCESS,
      ruleResults: [
        {
          rule: {
            id: "1.1.1"
          },
          status: A11yResultStatus.SUCCESS,
        },
        {
          rule: {
            id: "1.1.1"
          },
          status: A11yResultStatus.SUCCESS,
        },
        {
          rule: {
            id: "1.1.2"
          },
          status: A11yResultStatus.SUCCESS,
        },
        {
          rule: {
            id: "1.2.2"
          },
          status: A11yResultStatus.SUCCESS,
        },
        {
          rule: {
            id: "8.1.1"
          },
          status: A11yResultStatus.SUCCESS,
        }
      ]
    });
    expect(summary).toEqual({
      status: A11yResultStatus.SUCCESS,
      criteria: {
        "1.1": {
          status: A11yResultStatus.SUCCESS,
          tests: {
            "1.1.1": {
              status: A11yResultStatus.SUCCESS
            },
            "1.1.2": {
              status: A11yResultStatus.SUCCESS
            }
          }
        },
        "1.2": {
          status: A11yResultStatus.SUCCESS,
          tests: {
            "1.2.2": {
              status: A11yResultStatus.SUCCESS
            }
          }
        },
        "8.1": {
          status: A11yResultStatus.SUCCESS,
          tests: {
            "8.1.1": {
              status: A11yResultStatus.SUCCESS
            }
          }
        }
      }
    });
  });

  it("compute should returns error if one validation have failed", async () => {
    const result: A11yResult = Object.assign(new A11yResult(fakeUrl, A11Y_RGAA_REFERENCE), {
      ruleResults: [
        buildA11RuleResult({
          rule: {
            id: "1.1.1"
          },
          validations: [
            {
              "status": "error"
            },
            {
              "status": "manual"
            }
          ]
        }),
        buildA11RuleResult( {
          rule: {
            id: "1.1.1"
          },
          validations: [
            {
              "status": "success"
            }
          ]
        }),
        buildA11RuleResult( {
          rule: {
            id: "1.1.2"
          },
          validations: [
            {
              "status": "success"
            }
          ]
        }),
        buildA11RuleResult( {
          rule: {
            id: "1.2.2"
          },
          validations: [
            {
              "status": "success"
            }
          ]
        }),
        buildA11RuleResult({
          rule: {
            id: "8.1.1"
          },
          validations: [
            {
              "status": "success"
            }
          ]
        })
      ]
    });
    result.computeStatus();
    const summary = result.summary();
    expect(result).toMatchObject({
      status: A11yResultStatus.ERROR,
      ruleResults: [
        {
          rule: {
            id: "1.1.1"
          },
          status: A11yResultStatus.ERROR,
        },
        {
          rule: {
            id: "1.1.1"
          },
          status: A11yResultStatus.SUCCESS,
        },
        {
          rule: {
            id: "1.1.2"
          },
          status: A11yResultStatus.SUCCESS,
        },
        {
          rule: {
            id: "1.2.2"
          },
          status: A11yResultStatus.SUCCESS,
        },
        {
          rule: {
            id: "8.1.1"
          },
          status: A11yResultStatus.SUCCESS,
        }
      ]
    });
    expect(summary).toEqual({
      status: A11yResultStatus.ERROR,
      criteria: {
        "1.1": {
          status: A11yResultStatus.ERROR,
          tests: {
            "1.1.1": {
              status: A11yResultStatus.ERROR
            },
            "1.1.2": {
              status: A11yResultStatus.SUCCESS
            }
          }
        },
        "1.2": {
          status: A11yResultStatus.SUCCESS,
          tests: {
            "1.2.2": {
              status: A11yResultStatus.SUCCESS
            }
          }
        },
        "8.1": {
          status: A11yResultStatus.SUCCESS,
          tests: {
            "8.1.1": {
              status: A11yResultStatus.SUCCESS
            }
          }
        }
      }
    });
  });

  it("compute should returns manual if one validation is manual", async () => {
    const result: A11yResult = Object.assign(new A11yResult(fakeUrl, A11Y_RGAA_REFERENCE), {
      ruleResults: [
        buildA11RuleResult({
          rule: {
            id: "1.1.1"
          },
          validations: [
            {
              "status": "success"
            },
            {
              "status": "manual"
            }
          ]
        }),
        buildA11RuleResult( {
          rule: {
            id: "1.1.1"
          },
          validations: [
            {
              "status": "success"
            }
          ]
        }),
        buildA11RuleResult( {
          rule: {
            id: "1.1.2"
          },
          validations: [
            {
              "status": "success"
            }
          ]
        }),
        buildA11RuleResult( {
          rule: {
            id: "1.2.2"
          },
          validations: [
            {
              "status": "success"
            }
          ]
        }),
        buildA11RuleResult({
          rule: {
            id: "8.1.1"
          },
          validations: [
            {
              "status": "success"
            }
          ]
        }),
        buildA11RuleResult({
          rule: {
            id: "8.10.1"
          },
          validations: [
            {
              "status": "success"
            }
          ]
        }),
        buildA11RuleResult({
          rule: {
            id: "10.1.1"
          },
          validations: [
            {
              "status": "success"
            }
          ]
        })
      ]
    });
    result.computeStatus();
    const summary = result.summary();
    expect(result).toMatchObject({
      status: A11yResultStatus.MANUAL,
      ruleResults: [
        {
          rule: {
            id: "1.1.1"
          },
          status: A11yResultStatus.MANUAL,
        },
        {
          rule: {
            id: "1.1.1"
          },
          status: A11yResultStatus.SUCCESS,
        },
        {
          rule: {
            id: "1.1.2"
          },
          status: A11yResultStatus.SUCCESS,
        },
        {
          rule: {
            id: "1.2.2"
          },
          status: A11yResultStatus.SUCCESS,
        },
        {
          rule: {
            id: "8.1.1"
          },
          status: A11yResultStatus.SUCCESS,
        },
        {
          rule: {
            id: "8.10.1"
          },
          status: A11yResultStatus.SUCCESS,
        },
        {
          rule: {
            id: "10.1.1"
          },
          status: A11yResultStatus.SUCCESS,
        }
      ]
    });
    expect(summary).toEqual({
      status: A11yResultStatus.MANUAL,
      criteria: {
        "1.1": {
          status: A11yResultStatus.MANUAL,
          tests: {
            "1.1.1": {
              status: A11yResultStatus.MANUAL
            },
            "1.1.2": {
              status: A11yResultStatus.SUCCESS
            }
          }
        },
        "1.2": {
          status: A11yResultStatus.SUCCESS,
          tests: {
            "1.2.2": {
              status: A11yResultStatus.SUCCESS
            }
          }
        },
        "8.1": {
          status: A11yResultStatus.SUCCESS,
          tests: {
            "8.1.1": {
              status: A11yResultStatus.SUCCESS
            }
          }
        },
        "8.10": {
          status: A11yResultStatus.SUCCESS,
          tests: {
            "8.10.1": {
              status: A11yResultStatus.SUCCESS
            }
          }
        },
        "10.1": {
          status: A11yResultStatus.SUCCESS,
          tests: {
            "10.1.1": {
              status: A11yResultStatus.SUCCESS
            }
          }
        }
      }
    });
  });
});
