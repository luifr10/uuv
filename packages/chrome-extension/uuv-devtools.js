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

chrome.devtools.inspectedWindow.eval("setSelectedElement($0)", { useContentScriptContext: true }, (result, exceptionInfo) => {
    console.log('result');
    console.log(result);
    console.log('exceptionInfo');
    console.log(exceptionInfo);
});
chrome.devtools.panels.create('UUV', null, '/uuv-devtools-panel.html', null);
