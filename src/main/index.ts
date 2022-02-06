import { app, BrowserWindow, globalShortcut, ipcMain, IpcMainEvent, WebContents } from "electron";
import { Channal, ChannalType } from "../common/api";
import { indexPath } from "./config";
import { SvgGenerator } from "./generate";

export let webContents: WebContents;

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      defaultFontFamily: {
        standard: "Times-Roman",
      },
    },
  });
  globalShortcut.register("f12", function () {
    mainWindow.webContents.openDevTools();
  });
  // and load the index.html of the app.
  mainWindow.loadURL("file://" + indexPath);
  webContents = mainWindow.webContents;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const svgGenerator = new SvgGenerator();

ipcMain.on(Channal.addFiles, async (ev: IpcMainEvent, data: ChannalType.AddFiles) => {
  await svgGenerator.onAddFiles(data);
  ev.reply(Channal.svgUpdated, svgGenerator.SvgPathStrings);
});
ipcMain.on(Channal.removeFiles, async (ev: IpcMainEvent, data: ChannalType.RemoveFiles) => {
  svgGenerator.onRemoveFiles(data);
  ev.reply(Channal.svgUpdated, svgGenerator.SvgPathStrings);
});
ipcMain.on(Channal.changeSize, async (ev: IpcMainEvent, data: ChannalType.ChangeSize) => {
  svgGenerator.onChangeSize(data);
  ev.reply(Channal.svgUpdated, svgGenerator.SvgPathStrings);
});
