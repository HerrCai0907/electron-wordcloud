import React from "react";
import { Upload, UploadProps } from "antd";
const { Dragger } = Upload;
import { InboxOutlined } from "@ant-design/icons";
import { Component } from "react";
import { UploadFile } from "antd/lib/upload/interface";
import { filePaths } from "./global";

export class Uploader extends Component<{}, {}> {
  draggerProps: UploadProps<UploadFile> = {
    name: "file",
    multiple: true,
    action: undefined,
    onChange: info => {
      if (info.file.originFileObj == undefined) return;
      switch (info.file.status) {
        case "done": {
          filePaths.add(info.file.originFileObj.path);
          break;
        }
        case "removed": {
          filePaths.remove(info.file.originFileObj.path);
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
