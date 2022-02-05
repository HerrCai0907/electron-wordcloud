import { ipcRenderer } from "electron";
import React, { Component } from "react";
import { Button, Card, Col, Row, Typography, Layout } from "antd";
const { Title } = Typography;
const { Content, Footer, Header } = Layout;
import "./app.css";
import { GenerateSvgArg } from "../common/generateInterface";
import { SvgDisplayer } from "./svgDisplayer";
import { Uploader } from "./uploader";
import { filePaths } from "./global";

export class App extends Component<{}, { svgPath: string[] }> {
  onclick = () => {
    let arg: GenerateSvgArg = {
      x: 300,
      y: 300,
      path: filePaths.filePaths,
    };
    ipcRenderer.send("generate_svg", arg);
  };

  render() {
    return (
      <Layout className="layout">
        <Header style={{ height: "fit-content" }}>
          <Title style={{ color: "white" }} level={4}>
            词云生成器
          </Title>
        </Header>
        <Content style={{ padding: "0 5px" }}>
          <div className="site-card-wrapper">
            <Row gutter={24} align="top">
              <Col span={12}>
                <Card title="编辑区" bordered={true}>
                  <Uploader />
                  <br />
                  <div style={{ textAlign: "center" }}>
                    <Button type="primary" onClick={this.onclick}>
                      生成词云
                    </Button>
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="预览区" bordered={true}>
                  <SvgDisplayer />
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}
