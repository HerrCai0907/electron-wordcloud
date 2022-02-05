import { ipcRenderer, IpcRendererEvent } from "electron";
import React, { Component } from "react";
import { GenerateSvgReply } from "../common/generateInterface";

const colorSet = ["#86E3CE", "#D0E6A5", "#FFDD94", "#FA897B", "#CCABD8"];

type P = {};
type S = { l: number; svgPath: string[] };

export class SvgDisplayer extends Component<P, S> {
  myRef;
  constructor(props: P) {
    super(props);
    this.state = {
      l: 300,
      svgPath: [],
    };
    this.myRef = React.createRef<HTMLDivElement>();
  }

  onChangeSize = () => {
    if (this.myRef.current) {
      this.setState({
        l: this.myRef.current.clientWidth,
      });
    }
  };
  onRecvData = (event: IpcRendererEvent, data: GenerateSvgReply) => {
    this.setState({ svgPath: data });
  };

  override componentDidMount = () => {
    this.onChangeSize();
    ipcRenderer.on("generate_svg_reply", this.onRecvData);
    window.addEventListener("resize", this.onChangeSize); //监听窗口大小改变
  };
  override componentWillUnmount = () => {
    ipcRenderer.off("generate_svg_reply", this.onRecvData);
    window.removeEventListener("resize", this.onChangeSize); //监听窗口大小改变
  };

  override render() {
    return (
      <div ref={this.myRef}>
        <svg width={this.state.l} height={this.state.l} xmlns="http://www.w3.org/2000/svg" version="1.1">
          {/* <title>词云</title> */}
          <rect x="1" y="1" width={this.state.l - 1} height={this.state.l - 1} fill="none" stroke="pink" strokeWidth={5} />
          {this.state.svgPath.map((v, i) => (
            <path d={v} key={i} fill={colorSet[Math.floor(Math.random() * colorSet.length)]} />
          ))}
        </svg>
      </div>
    );
  }
}
