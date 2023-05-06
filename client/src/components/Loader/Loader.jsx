import React from "react";
import {LineWave} from "react-loader-spinner";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader__wrapper">
      <LineWave
        height="120"
        width="120"
        color="#1677ff"
        ariaLabel="line-wave"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
    </div>
  );
};

export default Loader;
