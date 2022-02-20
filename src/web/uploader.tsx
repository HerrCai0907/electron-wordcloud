import { Upload, UploadProps } from "antd";
const { Dragger } = Upload;
import { InboxOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import { UploadFile } from "antd/lib/upload/interface";
import { ipcRenderer } from "electron";
import { Channal } from "../common/api";
import { debounceArray } from "./debounce";

const addFiles = debounceArray<string>(paths => ipcRenderer.send(Channal.addFiles, paths), 100);
const removeFiles = debounceArray<string>(paths => ipcRenderer.send(Channal.removeFiles, paths), 100);

export class Uploader extends Component<{}, {}> {
  draggerProps: UploadProps<UploadFile> = {
    name: "file",
    multiple: true,
    action: undefined,
    onChange: info => {
      if (info.file.originFileObj == undefined) return;
      switch (info.file.status) {
        case "done": {
          addFiles(info.file.originFileObj.path);
          break;
        }
        case "removed": {
          removeFiles(info.file.originFileObj.path);
          break;
        }
      }
    },
  };
  render() {
    return (
      <Dragger {...this.draggerProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">选择文件</p>
        <p className="ant-upload-hint">支持文本，pdf和docx格式</p>
      </Dragger>
    );
  }
}
