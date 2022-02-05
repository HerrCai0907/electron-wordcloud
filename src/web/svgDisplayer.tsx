import { ipcRenderer } from "electron";
import React, { Component } from "react";
import { GenerateSvgReply } from "../common/generateInterface";

const colorSet = ["#86E3CE", "#D0E6A5", "#FFDD94", "#FA897B", "#CCABD8"];

export class SvgDisplayer extends Component<{}, { svgPath: string[] }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      svgPath: [],
    };
    ipcRenderer.on("generate_svg_reply", (event, data: GenerateSvgReply) => {
      this.setState({ svgPath: data });
    });
  }

  render() {
    return (
      <div>
        <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <title>Example triangle01- simple example of a 'path'</title>
          <rect x="1" y="1" width="499" height="499" fill="none" stroke="pink" strokeWidth={5} />
          <desc>A path that draws a triangle</desc>
          {this.state.svgPath.map((v, i) => (
            <path d={v} key={i} fill={colorSet[Math.floor(Math.random() * colorSet.length)]} />
          ))}
        </svg>
      </div>
    );
  }
}
