/**
* Software Name : UUV
*
* SPDX-FileCopyrightText: Copyright (c) 2022-2023 Orange
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

import {
    generateStepDefinitionForMobileRunner,
    TEST_RUNNER_ENUM
} from "@uuv/runner-commons";

generateStepDefinitionForMobileRunner(__dirname, TEST_RUNNER_ENUM.APPIUM_ESPRESSO);
