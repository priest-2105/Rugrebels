import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const TotalRevenuesAreaChart = () => {
  const chartRef = useRef(null);
  let myChart = null;

  useEffect(() => {
    if (myChart !== null) {
      myChart.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
      labels: labels,
      datasets: [{
        label: 'Total Revenues',
        data: [1000, 1200, 900, 1500, 1300, 1700, 1400],
        fill: true,
        backgroundColor: 'rgba(167, 213, 15,0.1)',
        borderColor: 'rgba(167, 213, 15,9)',
        tension: 0.1
      }]
    };

    const config = {
      type: 'line',
      data: data,
      options: {
        scales: {
          x: {
            type: 'category',
            labels: labels,
            title: {
              display: true,
              text: 'Months'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total Revenue'
            }
          }
        }
      }
    };

    myChart = new Chart(ctx, config);

    return () => {
      if (myChart !== null) {
        myChart.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
}

export default TotalRevenuesAreaChart;
