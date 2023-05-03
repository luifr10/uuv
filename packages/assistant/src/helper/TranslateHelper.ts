/**
 * Copyright UUV.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import { computeAccessibleName, getRole } from "dom-accessibility-api";

export type BaseSentence = {
  key: string;
  description: string;
  wording: string;
}

export type EnrichedSentenceWrapper = {
  role: Array<EnrichedSentenceRole>;
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

export enum CheckActionEnum {
  WITHIN = "Within", EXPECT = "Expect"
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
      } else if (element.getAttribute("data-testId")) {
        selector += `[data-testId=${element.getAttribute("data-testId")}]`;
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
        if (index > 1) {
          selector += ":nth-of-type(" + index + ")";
        }
      }
      path.unshift(selector);
      element = element.parentNode;
    }
    return path.join(">");
  }

  private static getData(file: string) {
    return fetch(file, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }
    );
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  public static async translateEngine(htmlElem: HTMLElement, checkAction: string, isDisabled: boolean): Promise<string> {
    let json: any;
    let sentence: "No sentence found";
    await this.getData("en.json")
      .then((response) => response.json())
      .then((data) => json = data
      );
    let computedKey = "";
    if (checkAction === CheckActionEnum.EXPECT) {
      computedKey = "key.then.element.withSelector";
    } else if (checkAction === CheckActionEnum.WITHIN) {
      computedKey = "key.when.withinElement.selector";
    }
    sentence = await json
      .filter((el: BaseSentence) => el.key === computedKey)
      .map((el: BaseSentence) =>
        el.wording.replace("{string}", `"${this.getSelector(htmlElem)}"`)
      )[0];
    const accessibleRole = getRole(htmlElem);
    const accessibleName = computeAccessibleName(htmlElem);
    const content = htmlElem.getAttribute("value") ?? htmlElem.textContent;
    if (accessibleRole && accessibleName) {
      let jsonEnriched: any;
      await this.getData("/en-enriched-wordings.json")
        .then((response) => response.json())
        .then((data: EnrichedSentenceWrapper) => {
          jsonEnriched = data;
        });
      if (checkAction === CheckActionEnum.EXPECT) {
        computedKey = "key.then.element.withRoleAndName";
      } else if (checkAction === CheckActionEnum.WITHIN) {
        computedKey = "key.when.withinElement.roleAndName";
      }
      sentence = jsonEnriched.enriched.filter((value: EnrichedSentence) => value.key === computedKey).map((enriched: EnrichedSentence) => {
        const sentenceAvailable = enriched.wording;
        const role = jsonEnriched.role.filter((role: EnrichedSentenceRole) => role.id === accessibleRole)[0];
        return sentenceAvailable
          .replaceAll("(n)", "")
          .replace("$roleName", role?.name ?? accessibleRole)
          .replace("{string}", `"${accessibleName}"`);
      })[0];
      if (content) {
        if (checkAction === CheckActionEnum.EXPECT) {
          if (isDisabled) {
            computedKey = "key.then.element.withRoleAndNameAndContentDisabled";
          } else {
            computedKey = "key.then.element.withRoleAndNameAndContent";
          }
        } else if (checkAction === CheckActionEnum.WITHIN) {
          computedKey = "key.when.withinElement.roleAndName";
        }
        sentence = jsonEnriched.enriched.filter((value: EnrichedSentence) => value.key === computedKey).map((enriched: EnrichedSentence) => {
          const sentenceAvailable = enriched.wording;
          const role = jsonEnriched.role.filter((role: EnrichedSentenceRole) => role.id === accessibleRole)[0];
          return sentenceAvailable
            .replaceAll("(n)", "")
            .replace("$roleName", role?.name ?? accessibleRole)
            .replace("{string}", `"${accessibleName}"`)
            .replace("{string}", `"${content}"`);
        })[0];
      }
    }
    console.log("sentence: ", sentence);
    return sentence;
  }
}

