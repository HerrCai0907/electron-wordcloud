import React, { Component } from "react";
import { Card, Col, Row, Typography, Layout } from "antd";
const { Title } = Typography;
const { Content, Footer, Header } = Layout;
import "./app.css";
import { SvgDisplayer } from "./svgDisplayer";
import { Uploader } from "./uploader";

export class App extends Component<{}, { svgPath: string[] }> {
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
        <Footer style={{ textAlign: "center" }}>Word Cloud ©2018 Created by Congcong Cai</Footer>
      </Layout>
    );
  }
}
