import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import "./PieChart.css";
import backArrow from "../../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const PieChart = () => {
  const [data, setData] = useState([]);
  const chartData = [["City", "Percentage"], ...Object.entries(data)];

  const getAnalyticData = async () => {
    const res = await fetch(`http://localhost:3000/analytics`);
    const analyticData = await res.json();
    setData(analyticData);
  };
  useEffect(() => {
    getAnalyticData();
  }, [data]);

  const navigate = useNavigate();

  return (
    <div className="chart__wrapper">
      <div className="icon__wrapper" onClick={() => navigate("/")}>
        <img src={backArrow} alt="arrow icon" />
        <p>Back to home</p>
      </div>
      <div className="main__content">
        {data.length < 0 ? (
          <Loader />
        ) : (
          <Chart
            width={"500px"}
            height={"300px"}
            chartType="PieChart"
            data={chartData}
            options={{
              title: "Percentage of Users by City",
              is3D: true,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PieChart;
