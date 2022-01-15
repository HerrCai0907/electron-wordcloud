import React, { Component } from "react";
import { render } from "react-dom";
import { Button } from "antd";
import "./app.css";

class App extends Component {
  render() {
    return (
      <div>
        <Button type="primary">Button</Button>
      </div>
    );
  }
}

render(<App />, window.document.getElementById("app"));
