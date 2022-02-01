import { ipcRenderer } from "electron";
import React, { Component } from "react";
import { render } from "react-dom";
import { Button } from "antd";
import "./app.css";
import { GenerateSvgArg, GenerateSvgReply } from "../common/interface";
import { txt } from "../common/demo";

ipcRenderer.on("gen-reply", (event, arg) => {
  console.log("异步消息:", arg);
});

class App extends Component<{}, { svgPath: string[] }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      svgPath: [],
    };
  }

  onclick = () => {
    let arg: GenerateSvgArg = {
      x: 500,
      y: 500,
      text: txt,
    };
    ipcRenderer.send("generate_svg", arg);
    ipcRenderer.once("generate_svg_reply", (event, data: GenerateSvgReply) => {
      this.setState({ svgPath: data });
    });
  };

  render() {
    return (
      <div>
        <div>
          <Button type="primary" onClick={this.onclick}>
            Button
          </Button>
        </div>
        <div>
          <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <title>Example triangle01- simple example of a 'path'</title>
            <rect x="1" y="1" width="499" height="499" fill="none" stroke="pink" strokeWidth={5} />
            <desc>A path that draws a triangle</desc>
            {this.state.svgPath.map(v => (
              <path d={v}></path>
            ))}
          </svg>
        </div>
      </div>
    );
  }
}

render(<App />, window.document.getElementById("app"));
