import React, { useEffect, useState } from 'react';
import useJsonDataStore from './zustand/store';
import UserTable from './components/Table/UserTable';
import AntChart from './components/AntChart/AntChart';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);


  const getUsersData = async () => {
    const response = await fetch('http://localhost:3000/data');
    const jsonData = await response.json();
    useJsonDataStore.setState({ jsonData });
    setIsLoading(false)
  }

  const userData = useJsonDataStore((state) => state.jsonData);


  useEffect(() => {
    setIsLoading(true);
    getUsersData()
  }, [userData]);


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserTable />} />
          <Route path='/piechart' element={<AntChart />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App