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

const { app, BrowserWindow, ipcMain, BrowserView } = require("electron");
const path = require("path");
const React = require("react");
function createWindow () {
  // Create the browser window.
  const parent = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js")
    }
  });
  ipcMain.on("set-url", (event, url) => {
    const child = new BrowserWindow({
      width: 1200,
      height: 1200,
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, "preload_child.js")
      },
      parent: parent
    });//FIXME with dist
    child.loadURL(url);
  });

  //load the index.html from a url
  parent.loadURL("http://localhost:3200/search");

  // Open the DevTools.
  parent.webContents.openDevTools();
  // const child = new BrowserWindow({
  //   width: 800,
  //   height: 600,
  //   webPreferences: {
  //     nodeIntegration: true
  //   },
  //   parent: parent
  // });//FIXME with dist
  // child.loadURL("http://localhost:3200");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
