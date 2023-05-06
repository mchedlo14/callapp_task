import React, { useEffect, useState } from "react";
import useJsonDataStore from "./zustand/store";
import UserTable from "./components/Table/UserTable";
import AntChart from "./components/PieChart/PieChart";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const getUsersData = async () => {
    const response = await fetch("http://localhost:3000/data");
    const jsonData = await response.json();
    useJsonDataStore.setState({ jsonData });
  };

  const userData = useJsonDataStore((state) => state.jsonData);

  useEffect(() => {
    getUsersData();
  }, [userData]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserTable />} />
          <Route path="/piechart" element={<AntChart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
