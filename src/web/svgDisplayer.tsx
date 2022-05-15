import { ipcRenderer, IpcRendererEvent } from "electron";
import React, { Component } from "react";
import { Channal, ChannalType } from "../common/api";
import { debounceValue } from "./debounce";

type P = {};
type S = { l: number; svgPath: string[]; colors: string[] };

export class SvgDisplayer extends Component<P, S> {
  myRef;
  constructor(props: P) {
    super(props);
    this.state = {
      l: 300,
      svgPath: [],
      colors: [],
    };
    this.myRef = React.createRef<HTMLDivElement>();
  }

  // svg changed
  private onRecvData = (ev: IpcRendererEvent, data: ChannalType.SvgUpdated) => {
    if (this.state.colors.length < data.length) {
      ipcRenderer.send(Channal.getColor);
    }
    this.setState({ svgPath: data });
  };

  // size changed
  private _onChangeSize = debounceValue<number>(width => {
    this.setState({
      l: width,
    });
    ipcRenderer.send(Channal.changeSize, width);
  }, 100);
  private onChangeSize = () => {
    if (this.myRef.current) {
      const width: ChannalType.ChangeSize = this.myRef.current.clientWidth;
      this._onChangeSize(width);
    }
  };

  // color changed
  private onChangeColor = (ev: IpcRendererEvent, data: ChannalType.ColorUpdated) => {
    this.setState({ colors: data });
  };

  // register and un register
  override componentDidMount = () => {
    this.onChangeSize();
    ipcRenderer.on(Channal.svgUpdated, this.onRecvData);
    ipcRenderer.on(Channal.colorUpdated, this.onChangeColor);
    window.addEventListener("resize", this.onChangeSize); //监听窗口大小改变
  };
  override componentWillUnmount = () => {
    ipcRenderer.off(Channal.svgUpdated, this.onRecvData);
    ipcRenderer.off(Channal.colorUpdated, this.onChangeColor);
    window.removeEventListener("resize", this.onChangeSize); //监听窗口大小改变
  };

  override render() {
    return (
      <div ref={this.myRef}>
        <svg width={this.state.l} height={this.state.l} xmlns="http://www.w3.org/2000/svg" version="1.1">
          <rect x="1" y="1" width={this.state.l - 1} height={this.state.l - 1} fill="none" stroke="#000000" strokeWidth={1} strokeDasharray="5,5" />
          {this.state.svgPath.map((v, i) => (
            <path d={v} key={i} fill={this.state.colors[i] || "#FFFFFF"} />
          ))}
        </svg>
      </div>
    );
  }
}
