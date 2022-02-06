import React from "react";
import { render } from "react-dom";
import { App } from "./app";
import { ipcRenderer } from "electron";
import { Channal } from "../common/api";
import { ErrorMessage } from "../common/errorInterface";
import { openNotification } from "./errorMessage";

// error
ipcRenderer.on(Channal.errorHappened, (event, args: ErrorMessage) => {
  openNotification(args.msg, args.desc);
});

// render
render(<App />, window.document.getElementById("app"));
