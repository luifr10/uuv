/**
* Software Name : UUV
*
* SPDX-FileCopyrightText: Copyright (c) 2022-2024 Orange
* SPDX-License-Identifier: MIT
*
* This software is distributed under the MIT License,
* the text of which is available at https://spdx.org/licenses/MIT.html
* or see the "LICENSE" file for more details.
*
* Authors: NJAKO MOLOM Louis Fredice & SERVICAL Stanley
* Software description: Make test writing fast, understandable by any human
* understanding English or French.
*/

import { DEFAULT_TIMEOUT } from "@uuv/runner-commons";
import { IContext } from "@uuv/runner-commons";
import { Locator } from "@playwright/test";

export class Context implements IContext {
  public focusedElement ?: Locator;
  public timeout : number | null = DEFAULT_TIMEOUT;
}
