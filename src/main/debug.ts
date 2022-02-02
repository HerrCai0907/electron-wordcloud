import { ipcMain } from "electron";

let debugInfo: any[];
export function addDebug(d: any) {
  if (debugInfo == undefined) {
    debugInfo = [d];
  }
}
ipcMain.on("debug-req", event => {
  if (debugInfo && debugInfo.length > 0) {
    event.reply("debug", debugInfo);
    debugInfo = [];
  }
});
