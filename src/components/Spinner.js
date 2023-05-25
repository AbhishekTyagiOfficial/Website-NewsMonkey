import React, { Component } from "react";
import Fading_loading from "./Fading_loading.gif";

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={Fading_loading} alt="loading" />
      </div>
    );
  }
}

export default Spinner;
