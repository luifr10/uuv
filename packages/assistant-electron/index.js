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

const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");
const fs = require('fs');

const IS_DEV = process.env.ELECTRON_IS_DEV;
const BASE_URL = "https://orange-opensource.github.io/uuv/assistant/";
const ASSISTANT_SCRIPT = "uuv-assistant-resources.bundle.js";

async function downloadAssistantScript() {
  await fetch(`${BASE_URL}/${ASSISTANT_SCRIPT}`)
      .then(res => res.text())
      .then(content => {
        fs.writeFileSync(path.join(__dirname, ASSISTANT_SCRIPT), content);
      });
}

function closeAllWindows() {
  if (process.platform !== "darwin") {
    app.quit();
  }
}

function createWindow () {
  const parent = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
    resizable: false,
    movable: false,
    thickFrame: true,
    frame: false
  });

  ipcMain.on("set-url", (event, url) => {
    let child;
    if (IS_DEV) {
      child = new BrowserWindow({
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
          nodeIntegration: true,
          alwaysOnTop: true,
          preload: path.join(__dirname, "..", "assistant", "dist", ASSISTANT_SCRIPT)
        },
        parent: parent
      });
    } else {
      downloadAssistantScript();
      child = new BrowserWindow({
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
          nodeIntegration: true,
          alwaysOnTop: true,
          preload: path.join(__dirname, ASSISTANT_SCRIPT)
        },
        parent: parent
      });
    }
    child.loadURL(url);
    child.maximize();
  });

  ipcMain.on("goto-link", (event, url) => {
    shell.openExternal(url);
  });

  ipcMain.on("close-main-window", (event, url) => {
    closeAllWindows();
  });

  if (IS_DEV) {
    parent.webContents.openDevTools();
    parent.loadFile("index.html");
  } else {
    parent.loadURL(`${BASE_URL}/index.html`);
  }
  parent.maximize();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  closeAllWindows();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

