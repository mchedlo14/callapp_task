import React, { useEffect, useState } from 'react';
import useJsonDataStore from './zustand/store';
import Table from './components/Table/Table';


const App = () => {
  const [isLoading, setIsLoading] = useState(false);


  const getUsersData = async () => {
    const response = await fetch('http://localhost:3000/data');
    const jsonData = await response.json();
    useJsonDataStore.setState({ jsonData });
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true);
    getUsersData()
  }, []);





  return (
    <div>
      <Table />   
    </div>
  )
}

export default App