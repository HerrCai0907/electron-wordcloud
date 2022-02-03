import { ipcMain } from "electron";

let debugInfo: any[];
export function addDebug(d: any) {
  console.error(d);
  if (debugInfo == undefined) {
    debugInfo = [d];
  } else {
    debugInfo.push(d);
  }
}
ipcMain.on("debug-req", event => {
  if (debugInfo && debugInfo.length > 0) {
    event.reply("debug", debugInfo);
    debugInfo = [];
  }
});
