import { ipcRenderer } from "electron";
import React, { Component } from "react";
import { render } from "react-dom";
import { Button } from "antd";
import "./app.css";
import { GenerateSvgArg } from "../common/interface";
import { SvgDisplayer } from "./svgDisplayer";
import { Uploader } from "./uploader";
import { filePaths } from "./global";

ipcRenderer.on("debug", (event, arg) => {
  console.log("DEBUG:", arg);
});
setInterval(() => {
  ipcRenderer.send("debug-req");
}, 1000);

class App extends Component<{}, { svgPath: string[] }> {
  onclick = () => {
    let arg: GenerateSvgArg = {
      x: 500,
      y: 500,
      path: filePaths.filePaths,
    };
    ipcRenderer.send("generate_svg", arg);
  };

  render() {
    return (
      <div>
        <Uploader />
        <div>
          <Button type="primary" onClick={this.onclick}>
            Button
          </Button>
        </div>
        <SvgDisplayer />
      </div>
    );
  }
}

render(<App />, window.document.getElementById("app"));
