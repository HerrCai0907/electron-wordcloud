import { ipcRenderer, IpcRendererEvent } from "electron";
import React, { Component } from "react";
import { Channal, ChannalType } from "../common/api";

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
      const width: ChannalType.ChangeSize = this.myRef.current.clientWidth;
      this.setState({
        l: width,
      });
      ipcRenderer.send(Channal.changeSize, width);
    }
  };
  onRecvData = (event: IpcRendererEvent, data: ChannalType.SvgUpdated) => {
    this.setState({ svgPath: data });
  };

  override componentDidMount = () => {
    this.onChangeSize();
    ipcRenderer.on(Channal.svgUpdated, this.onRecvData);
    window.addEventListener("resize", this.onChangeSize); //监听窗口大小改变
  };
  override componentWillUnmount = () => {
    ipcRenderer.off(Channal.svgUpdated, this.onRecvData);
    window.removeEventListener("resize", this.onChangeSize); //监听窗口大小改变
  };

  override render() {
    return (
      <div ref={this.myRef}>
        <svg width={this.state.l} height={this.state.l} xmlns="http://www.w3.org/2000/svg" version="1.1">
          <rect x="1" y="1" width={this.state.l - 1} height={this.state.l - 1} fill="none" stroke="pink" strokeWidth={5} />
          {this.state.svgPath.map((v, i) => (
            <path d={v} key={i} fill={colorSet[Math.floor(Math.random() * colorSet.length)]} />
          ))}
        </svg>
      </div>
    );
  }
}
