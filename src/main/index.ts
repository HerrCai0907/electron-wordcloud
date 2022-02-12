import { app, BrowserWindow, globalShortcut, ipcMain, IpcMainEvent, WebContents } from "electron";
import { Channal, ChannalType } from "../common/api";
import { ColorGenerator } from "./color/color";
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
const colorGenerator = new ColorGenerator();

// svg API
ipcMain.on(Channal.addFiles, async (ev: IpcMainEvent, data: ChannalType.AddFiles) => {
  console.log(`add files ${data}`);
  await svgGenerator.onAddFiles(data);
  ev.reply(Channal.svgUpdated, svgGenerator.svgPathStrings);
});
ipcMain.on(Channal.removeFiles, async (ev, data: ChannalType.RemoveFiles) => {
  console.log(`remove files ${data}`);
  svgGenerator.onRemoveFiles(data);
  ev.reply(Channal.svgUpdated, svgGenerator.svgPathStrings);
});
ipcMain.on(Channal.changeSize, async (ev, data: ChannalType.ChangeSize) => {
  console.log(`change size ${data}`);
  svgGenerator.onChangeSize(data);
  ev.reply(Channal.svgUpdated, svgGenerator.svgPathStrings);
});

// color API
ipcMain.on(Channal.getColor, ev => {
  console.log("get color");
  ev.reply(Channal.getColorReply, colorGenerator.getColors(svgGenerator.topN));
});
