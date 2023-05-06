import React from "react";
import "./Loader.css";
import { LineWave } from "react-loader-spinner";
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
