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

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  setUrl: (url) => ipcRenderer.send("set-url", url),
  goToLink: (url) => ipcRenderer.send("goto-link", url),
  closeMainWindow: (url) => ipcRenderer.send("close-main-window", url),
  highlight: (element) => ipcRenderer.send("highlight", element)
});
