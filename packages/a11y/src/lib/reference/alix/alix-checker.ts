// import {
//     AutoCheckRule,
//     CheckRelevantSummary,
//     ErrorSummary, LogTypeEnum,
//     ManualCheckRule, Reference,
//     RuleTypeEnum,
//     ThirdPartyReferenceEnum,
//     ThirdPartyTypeEnum
// } from "../../model";
// import { searchByRoleWithoutAttribute, searchByTag } from "../core";
// import { alix } from "@uuv/runner-commons";
// import { Observable } from "rxjs";
//
//
// abstract class AlixChecker implements Reference {
//   constructor(public version: string) {}
//
//   getErrorLogCommand(type: LogTypeEnum): string {
//     throw new Error("Method not implemented.");
//   }
//   getCheckLogCommand(type: LogTypeEnum): string {
//       throw new Error("Method not implemented.");
//   }
//
//   type = ThirdPartyTypeEnum.UNKNOWN;
//   errorSummary = new ErrorSummary(ThirdPartyReferenceEnum.ALIX);
//   checkRelevantSummary = new CheckRelevantSummary(ThirdPartyReferenceEnum.ALIX);
//   emitter: Observable<boolean> = new Observable();
//
//   checkCriteria(): void {
//     cy.url({ log: false }).then(url => {
//       this.errorSummary.url = url;
//       this.checkRelevantSummary.url = url;
//       alix.rules.sort((a: any, b: any) => {
//         if (a.check > b.check) {
//           return 1;
//         }
//         if (a.check < b.check) {
//           return -1;
//         }
//         return 0;
//       }).filter((elem) => {
//         return elem.elementType.includes(this.type.toString());
//       })
//        .forEach((rule: any, index: number, array: any[]) => {
//          const isLast = index + 1 === array.length;
//          if (rule.type === RuleTypeEnum.ROLE) {
//            searchByRoleWithoutAttribute(Object.assign(new ManualCheckRule, rule), this, isLast);
//          }
//          if (rule.type === RuleTypeEnum.TAG) {
//            searchByTag(rule as AutoCheckRule, this, isLast);
//          }
//        });
//     });
//   }
// }
//
// export class AlixError extends AlixChecker implements Reference {
//   override type: ThirdPartyTypeEnum = ThirdPartyTypeEnum.ERROR;
//   override getErrorLogCommand(type: LogTypeEnum): string {
//     return `[${type.toString()}] error!`;
//   }
// }
// export class AlixWarning extends AlixChecker implements Reference {
//   override type: ThirdPartyTypeEnum = ThirdPartyTypeEnum.WARNING;
//   override  getErrorLogCommand(type: LogTypeEnum): string {
//       return `[${type.toString()}] warning!`;
//   }
// }
// export class AlixAdvice extends AlixChecker implements Reference {
//   override type: ThirdPartyTypeEnum = ThirdPartyTypeEnum.ADVICE;
//   override getErrorLogCommand(type: LogTypeEnum): string {
//     return `[${type.toString()}] advice!`;
//   }
// }
// export class AlixObsolete extends AlixChecker implements Reference {
//   override type: ThirdPartyTypeEnum = ThirdPartyTypeEnum.OBSOLETE;
//   override getErrorLogCommand(type: LogTypeEnum): string {
//     return `[${type.toString()}] obsolete!`;
//   }
// }
