import { ipcRenderer } from "electron";
import React, { Component } from "react";
import { Button, Typography } from "antd";
const { Title } = Typography;
import "./app.css";
import { GenerateSvgArg } from "../common/generateInterface";
import { SvgDisplayer } from "./svgDisplayer";
import { Uploader } from "./uploader";
import { filePaths } from "./global";

export class App extends Component<{}, { svgPath: string[] }> {
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
        <Title level={2}>词云生成器</Title>
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
