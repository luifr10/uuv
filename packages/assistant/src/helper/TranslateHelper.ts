/**
 * Software Name : UUV
 *
 * SPDX-FileCopyrightText: Copyright (c) Orange SA
 * SPDX-License-Identifier: MIT
 *
 * This software is distributed under the MIT License,
 * see the "LICENSE" file for more details
 *
 * Authors: NJAKO MOLOM Louis Fredice & SERVICAL Stanley
 * Software description: Make test writing fast, understandable by any human
 * understanding English or French.
 */


import { computeAccessibleName, getRole } from "dom-accessibility-api";
import { EN_ROLES, enBasedRoleSentences, enSentences } from "@uuv/runner-commons/wording/web/en";
import { FocusableElement } from "tabbable";
import { ActionEnum } from "../Commons";

export class Suggestion {
  constructor(
      public accessibleAttribute: string = "",
      public accessibleValue = "",
      public code = "",
      public sentenceAfterCorrection: string[] = []
  ) {}
}

export type BaseSentence = {
  key: string;
  description: string;
  wording: string;
}

export type EnrichedSentenceWrapper = {
  enriched: Array<EnrichedSentence>;
}

export type EnrichedSentenceRole = {
  id: string;
  name: string;
}
export type EnrichedSentence = {
  key: string;
  wording: string;
}

export enum StepCaseEnum {
  WHEN = "When ",
  THEN = "Then ",
  GIVEN = "Given ",
  AND = "And "
}

export type TranslateSentences = {
  suggestion: Suggestion | undefined,
  sentences: string[]
}

export class TranslateHelper {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  public static getSelector(element: any) {
    const path: string[] = [];
    while (element.nodeType === Node.ELEMENT_NODE) {
      let selector: string = element.nodeName.toLowerCase();
      if (element.id) {
        selector += "#" + element.id;
        path.unshift(selector);
        break;
      } else if (element.getAttribute("data-testid")) {
        selector += `[data-testid=${element.getAttribute("data-testid")}]`;
        path.unshift(selector);
        break;
      } else {
        let sibling = element.previousSibling;
        let index = 1;
        while (sibling) {
          if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName.toLowerCase() === selector) {
            index++;
          }
          sibling = sibling.previousSibling;
        }
        if (index > 1  || element.nextSibling) {
          selector += ":nth-of-type(" + index + ")";
        }
      }
      path.unshift(selector);
      element = element.parentNode;
    }
    return path.join(" > ");
  }

/* eslint-disable  @typescript-eslint/no-explicit-any */
  public static async translateEngine(htmlElem: FocusableElement, checkAction: string, isDisabled: boolean): Promise<TranslateSentences> {
    const jsonBase: BaseSentence[] = enSentences;
    let computedKey = "";
    let stepCase = "";
    const response: TranslateSentences = {
      suggestion: undefined,
      sentences: []
    };
    if (checkAction === ActionEnum.EXPECT) {
      computedKey = "key.then.element.withSelector";
      stepCase = StepCaseEnum.THEN;
    } else if (checkAction === ActionEnum.WITHIN || checkAction === ActionEnum.CLICK ) {
      computedKey = "key.when.withinElement.selector";
      stepCase = StepCaseEnum.WHEN;
    } else if (checkAction === ActionEnum.KEYBOARD_GLOBAL_NAVIGATION) {
      computedKey = "key.then.element.withSelectorFocused";
      stepCase = StepCaseEnum.THEN;
    }
    const sentence = jsonBase
      .filter((el: BaseSentence) => el.key === computedKey)
      .map((el: BaseSentence) =>
        el.wording.replace("{string}", `"${this.getSelector(htmlElem)}"`)
      )[0];
    if (checkAction === ActionEnum.CLICK) {
      const clickSentence: BaseSentence = jsonBase.filter((el: BaseSentence) => el.key === "key.when.click.withContext")[0];
      response.sentences = [stepCase + sentence, StepCaseEnum.THEN + clickSentence.wording];
    } else {
      response.sentences = [stepCase + sentence];
    }
    const accessibleRole = getRole(htmlElem);
    const accessibleName = computeAccessibleName(htmlElem);
    const content = htmlElem.getAttribute("value") ?? htmlElem.firstChild?.textContent?.trim();
    if (accessibleRole && accessibleName) {
      const jsonEnriched: EnrichedSentenceWrapper = enBasedRoleSentences;
      if (checkAction === ActionEnum.EXPECT) {
        computedKey = "key.then.element.withRoleAndName";
        stepCase = StepCaseEnum.THEN;
      } else if (checkAction === ActionEnum.WITHIN || checkAction === ActionEnum.CLICK) {
        computedKey = "key.when.withinElement.roleAndName";
        stepCase = StepCaseEnum.WHEN;
      } else if (checkAction === ActionEnum.KEYBOARD_GLOBAL_NAVIGATION) {
        computedKey = "key.then.element.withRoleAndNameFocused";
        stepCase = StepCaseEnum.THEN;
      }
      const sentence = jsonEnriched.enriched.filter((value: EnrichedSentence) => value.key === computedKey).map((enriched: EnrichedSentence) => {
        const sentenceAvailable = enriched.wording;
        const role = EN_ROLES.filter((role: EnrichedSentenceRole) => role.id === accessibleRole)[0];
        return sentenceAvailable
          .replaceAll("(n)", "")
          .replaceAll("$roleName", role?.name ?? accessibleRole)
          .replaceAll("$definiteArticle", role?.getDefiniteArticle())
          .replaceAll("$indefiniteArticle", role?.getIndefiniteArticle())
          .replaceAll("$namedAdjective", role?.namedAdjective())
          .replaceAll("$ofDefiniteArticle", role?.getOfDefiniteArticle())
          .replace("{string}", `"${accessibleName}"`);
      })[0];
      response.sentences = this.getSentenceList(checkAction, jsonBase, accessibleRole, stepCase, accessibleName, sentence);
      if (content) {
        if (checkAction === ActionEnum.EXPECT) {
          if (isDisabled) {
            computedKey = "key.then.element.withRoleAndNameAndContentDisabled";
            stepCase = StepCaseEnum.THEN;
          } else {
            computedKey = "key.then.element.withRoleAndNameAndContent";
            stepCase = StepCaseEnum.THEN;
          }
        } else if (checkAction === ActionEnum.WITHIN) {
          computedKey = "key.when.withinElement.roleAndName";
          stepCase = StepCaseEnum.WHEN;
        }
        const sentence = jsonEnriched.enriched.filter((value: EnrichedSentence) => value.key === computedKey).map((enriched: EnrichedSentence) => {
          const sentenceAvailable = enriched.wording;
          const role = EN_ROLES.filter((role: EnrichedSentenceRole) => role.id === accessibleRole)[0];
          return sentenceAvailable
            .replaceAll("(n)", "")
            .replaceAll("$roleName", role?.name ?? accessibleRole)
            .replaceAll("$definiteArticle", role?.getDefiniteArticle())
            .replaceAll("$indefiniteArticle", role?.getIndefiniteArticle())
            .replaceAll("$namedAdjective", role?.namedAdjective())
            .replaceAll("$ofDefiniteArticle", role?.getOfDefiniteArticle())
            .replace("{string}", `"${accessibleName}"`)
            .replace("{string}", `"${content}"`);
        })[0];
        response.sentences = this.getSentenceList(checkAction, jsonBase, accessibleRole, stepCase, accessibleName, sentence);
      }
    } else {
      response.suggestion = new Suggestion();
    }
    return response;
  }

  private static getSentenceList(
      checkAction: string,
      jsonBase: BaseSentence[],
      accessibleRole: string,
      stepCase: string,
      accessibleName: string,
      sentence: string
  ) {
    if (checkAction === ActionEnum.CLICK) {
      if (accessibleRole === "button") {
        const clickSentence: BaseSentence = jsonBase.filter(
            (el: BaseSentence) => (accessibleRole === "button" && el.key === "key.when.click.button")
        )[0];
        return [stepCase + clickSentence.wording.replace("{string}", `"${accessibleName}"`)];
      } else {
        const clickSentence: BaseSentence = jsonBase.filter((el: BaseSentence) => el.key === "key.when.click.withRole")[0];
        return [stepCase + clickSentence.wording.replace("{string}", `"${accessibleRole}"`).replace("{string}", `"${accessibleName}"`)];
      }
    } else {
      return [stepCase + sentence];
    }
  }
}

