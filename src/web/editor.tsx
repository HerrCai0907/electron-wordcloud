import { Divider, InputNumber, Switch } from "antd";
import { SwitchChangeEventHandler } from "antd/lib/switch";
import { ipcRenderer } from "electron";
import React, { Component } from "react";
import { Channal, ChannalType } from "../common/api";
import { Uploader } from "./uploader";

export class Editor extends Component<{}, {}> {
  onChangeChineseOnlySwitch: SwitchChangeEventHandler = (checked: ChannalType.SetChineseOnly, event) => {
    ipcRenderer.send(Channal.setChineseOnly, checked);
  };
  onChangeTopN = (value: number) => {
    if (value == undefined) {
      return;
    }
    ipcRenderer.send(Channal.setTopN, value);
  };

  render() {
    return (
      <div>
        <Uploader></Uploader>
        <Divider />
        <Switch checkedChildren="仅中文" unCheckedChildren="中英文" defaultChecked onChange={this.onChangeChineseOnlySwitch} />
        <Divider />
        单词数量: <InputNumber<number> min={10} max={1000} defaultValue={64} onChange={this.onChangeTopN} />
      </div>
    );
  }
}
