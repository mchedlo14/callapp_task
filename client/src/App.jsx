import {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AntChart from "./components/PieChart/PieChart";
import UserTable from "./components/Table/UserTable";
import {listUsers} from "./utils/users-api/users.utils.js";
import useJsonDataStore from "./zustand/store";

const App = () => {
  const getUsersData = async () => {
    const jsonData = await listUsers()
    useJsonDataStore.setState({jsonData});
  };

  const userData = useJsonDataStore((state) => state.jsonData);

  useEffect(() => {
    (async () => {
      await getUsersData()
    })()
  }, [userData]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserTable/>}/>
          <Route path="/piechart" element={<AntChart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
