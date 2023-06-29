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

const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");
const fs = require('fs');

const IS_DEV = process.env.ELECTRON_IS_DEV;
const BASE_URL = "https://e2e-test-quest.github.io/uuv/assistant/";
const ASSISTANT_SCRIPT = "uuv-assistant-resources.bundle.js";

async function downloadAssistantScript() {
  await fetch(`${BASE_URL}/${ASSISTANT_SCRIPT}`)
      .then(res => res.text())
      .then(content => {
        fs.writeFileSync(path.join(__dirname, ASSISTANT_SCRIPT), content);
      });
}


function createWindow () {
  const parent = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    }
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
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

