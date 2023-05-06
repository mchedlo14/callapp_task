import React, { useEffect } from 'react'
import { Chart } from 'react-google-charts';
import useJsonDataStore from '../../zustand/store'
import './AntChart.css'
import backArrow from '../../assets/icons/arrow.svg'
import { useNavigate } from 'react-router-dom';

const AntChart = () => {

    const userData = useJsonDataStore((state) => state.jsonData);
    const navigate = useNavigate()

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
        <div className='chart__wrapper'>
            <div className='icon__wrapper' onClick={() => navigate('/')}>
                <img src={backArrow} alt='arrow icon'/>
                <p>Back to home</p>
            </div>
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
