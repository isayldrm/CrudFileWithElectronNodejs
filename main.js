//electron islemleri
const electron = require("electron");
const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const ipc = electron.ipcMain;
const dialog = electron.dialog;
let win;

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      nativeWindowOpen: true,
      nodeIntegration: true
    }
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  win.on("closed", () => {
    win = null;
  });

  //   win.setMenu(null);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("active", () => {
  if (win == null) {
    createWindow();
  }
});
