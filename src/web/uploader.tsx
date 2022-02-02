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
    onRemove: file => {
      console.log(file);
      if (file.originFileObj) {
        filePaths.remove(file.originFileObj.path);
      }
      return true;
    },
    onDrop: (e: React.DragEvent<HTMLDivElement>) => {
      console.log("Dropped files", e.dataTransfer.files);
      const k = e.dataTransfer.files.length;
      for (let i = 0; i < k; i++) {
        filePaths.add(e.dataTransfer.files[i].path);
      }
    },
  };
  render() {
    return (
      <Dragger {...this.draggerProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
      </Dragger>
    );
  }
}
