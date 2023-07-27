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

document.addEventListener("DOMContentLoaded", () => {
    console.log('content-script');

    let rootElement = document.createElement('div');
    rootElement.id = 'uvv-assistant-root';
    document.body.appendChild(rootElement);
    document.dispatchEvent(new Event('UUVReadyToLoad'));
});
