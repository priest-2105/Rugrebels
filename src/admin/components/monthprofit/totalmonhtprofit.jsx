import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Totalmonthprofit = () => {
    const chartRef = useRef(null);
    let myChart = null;

    useEffect(() => {
        if (myChart !== null) {
            myChart.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Product 1', 'Product 2', 'Product 3'],
                datasets: [{
                    label: 'Monthly Income',
                    data: [10400, 30050, 9000], // Example data, replace with actual data
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                    ]
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Income Distribution by Product'
                }
            }
        });

        return () => {
            if (myChart !== null) {
                myChart.destroy();
            }
        }
    }, []);

    return <canvas ref={chartRef} style={{ width: '100px', height: '100px', disply:"flex" }}/>;
}

export default Totalmonthprofit;
