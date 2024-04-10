#!/usr/bin/env node


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

import { UUVCliEngine } from "@uuv/runner-commons";
import { UUVCliPlaywrightRunner } from "./runner-playwright";

export async function main(projectDir =  "./uuv", tempDir =  "uuv/.uuv-features-gen") {
  const engine = new UUVCliEngine(
      new UUVCliPlaywrightRunner(projectDir, tempDir)
  );
  engine.execute();
}
