import React, { Component } from "react";
import "./App.css";

import Location from "./components/Location";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Location />
      </div>
    );
  }
}
