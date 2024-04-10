#!/usr/bin/env node


import { UUVCliEngine } from "@uuv/runner-commons";
import { UUVCliCypressRunner } from "./runner-cypress";

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

export async function main(projectDir = "./uuv") {
  const engine = new UUVCliEngine(
      new UUVCliCypressRunner(projectDir)
  );
  engine.execute();
}
