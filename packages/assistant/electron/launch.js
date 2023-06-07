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
const React = require("react");
const isDev = require('electron-is-dev');

function createWindow () {
  const parent = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js")
    }
  });
  ipcMain.on("set-url", (event, url) => {
    let child;
    if (isDev) {
      child = new BrowserWindow({
        width: 1200,
        height: 1200,
        webPreferences: {
          nodeIntegration: true,
          alwaysOnTop: true,
          preload: path.join(__dirname, "preload_child.js")
        },
        parent: parent
      });
    } else {
      child = new BrowserWindow({
        width: 1200,
        height: 1200,
        webPreferences: {
          nodeIntegration: true,
          alwaysOnTop: true,
        },
        parent: parent
      });
      // FIXME curl to get JS assistant
    }
    child.loadURL(url);
  });
  ipcMain.on("goto-link", (event, url) => {
    shell.openExternal(url);
  });

  if (isDev) {
    parent.webContents.openDevTools();
    parent.loadFile("index.html");
  } else {
    //FIXME loadUrl index.html
  }
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

