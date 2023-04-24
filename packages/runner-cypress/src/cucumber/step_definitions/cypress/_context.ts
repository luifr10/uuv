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

import { IContext } from "@uuv/runner-commons";
import { DEFAULT_TIMEOUT } from "@uuv/runner-commons";


export class Context implements IContext {
  public focusedElement ?: Cypress.Chainable<JQuery<HTMLElement>>;
  public timeout : number | null = DEFAULT_TIMEOUT;
}
