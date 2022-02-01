import { app, BrowserWindow, globalShortcut, ipcMain, IpcMainEvent } from "electron";
import { GenerateSvgArg, GenerateSvgReply } from "../common/interface";
import { indexPath } from "./config";
import { generate } from "./generate";
import { cutWords } from "./wordcut";

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  globalShortcut.register("f12", function () {
    mainWindow.webContents.openDevTools();
  });
  // and load the index.html of the app.
  mainWindow.loadURL("file://" + indexPath);
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

ipcMain.on("generate_svg", (event: IpcMainEvent, data: GenerateSvgArg) => {
  const words = cutWords(data.text, 64);
  const svgpath: GenerateSvgReply = generate(words, data);
  event.reply("generate_svg_reply", svgpath);
});
