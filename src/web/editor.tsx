import { Divider, InputNumber, Select, Space, Switch } from "antd";
import { SwitchChangeEventHandler } from "antd/lib/switch";
import { ipcRenderer } from "electron";
import React, { Component } from "react";
import { Channal, ChannalType } from "../common/api";
import { ColorThema, colorThemas, defaultThema } from "../common/colorThema";
import { Uploader } from "./uploader";

const { Option } = Select;

export class Editor extends Component<{}, {}> {
  onChangeChineseOnlySwitch: SwitchChangeEventHandler = (checked: ChannalType.SetChineseOnly, event) => {
    ipcRenderer.send(Channal.setChineseOnly, checked);
  };
  onChangeTopN = (value: number | undefined) => {
    if (value == undefined) return;
    ipcRenderer.send(Channal.setTopN, value);
  };
  onChangeThema = (value: ColorThema | undefined) => {
    if (value == undefined) return;
    ipcRenderer.send(Channal.setThema, value);
  };

  render() {
    return (
      <div>
        <Uploader></Uploader>
        <Divider />
        单词数量: <InputNumber<number> min={10} max={1000} defaultValue={64} onChange={this.onChangeTopN} />
        <Divider />
        <Select defaultValue={defaultThema} style={{ width: 120 }} onChange={this.onChangeThema}>
          {colorThemas.map(thema => (
            <Option value={thema.id}>{thema.id}</Option>
          ))}
        </Select>
        <Divider />
        <Switch checkedChildren="仅中文" unCheckedChildren="中英文" defaultChecked onChange={this.onChangeChineseOnlySwitch} />
        <Divider />
      </div>
    );
  }
}
