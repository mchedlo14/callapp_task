import React, { useEffect } from 'react'
import { Chart } from 'react-google-charts';
import useJsonDataStore from '../../zustand/store'

const AntChart = () => {

    const userData = useJsonDataStore((state) => state.jsonData);

    let chartData = [['City', 'Percentage']];

    if (userData !== null) {
      const cityCounts = userData.reduce((acc, user) => {
          const city = user.address.city;
          if (!acc[city]) {
              acc[city] = 0;
          }
          acc[city]++;
          return acc;
      }, {});

      const totalUsers = userData.length;

      Object.keys(cityCounts).forEach(city => {
          const percentage = (cityCounts[city] / totalUsers) * 100;
          chartData.push([city, percentage]);
      });
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              { userData === null ? <>Loading</> :
                  <Chart
                  width={'500px'}
                  height={'300px'}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={chartData}
                  options={{
                      title: 'Percentage of Users by City',
                      is3D: true,
                  }}
                  rootProps={{ 'data-testid': '1' }}
                  />
              }
            </div>
        </div>
    )
}

export default AntChart