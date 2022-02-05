import React from "react";
import { render } from "react-dom";
import { App } from "./app";
import { ipcRenderer } from "electron";
import { Channal } from "../common/api";
import { ErrorMessage } from "../common/errorInterface";
import { openNotification } from "./errorMessage";

// debug
ipcRenderer.on("debug", (event, arg) => {
  console.log("DEBUG:", arg);
});
setInterval(() => {
  ipcRenderer.send("debug-req");
}, 1000);

// error
ipcRenderer.on(Channal.errorhappened, (event, args: ErrorMessage) => {
  openNotification(args.msg, args.desc);
});

// render
render(<App />, window.document.getElementById("app"));
