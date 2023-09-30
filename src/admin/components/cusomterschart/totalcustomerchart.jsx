import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Totalcustomerchart = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const chartRef = useRef(null);
    let myChart = null;

    const handleChangeYear = (event) => {
        setSelectedYear(event.target.value);
    }

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const filteredData = [50, 30, 40, 60, 70, 80, 90, 100, 110, 120, 130, 140]; // Example data, replace with actual data

    useEffect(() => {
        if (myChart !== null) {
            myChart.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: `Customer Data for ${selectedYear}`,
                    data: filteredData,
                    background: 'rgb(167, 213, 15)',
                    borderColor: 'rgba(167, 213, 15,9)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Customers'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Months'
                        }
                    }
                }
            }
        });

        return () => {
            if (myChart !== null) {
                myChart.destroy();
            }
        }
    }, [selectedYear]);

    return (
        <div>
            <select value={selectedYear} onChange={handleChangeYear} style={{marginLeft:"20px", backgroundColor:"transparent", color:"aliceblue", borderRadius:"6px" }}>
                <option value={new Date().getFullYear() - 2}  style={{marginLeft:"20px", backgroundColor:"transparent", color:"aliceblue", borderRadius:"6px" }}>{new Date().getFullYear() - 2}</option>
                <option value={new Date().getFullYear() - 1}  style={{marginLeft:"20px", backgroundColor:"transparent", color:"aliceblue", borderRadius:"6px" }}>{new Date().getFullYear() - 1}</option>
                <option value={new Date().getFullYear()}  style={{marginLeft:"20px", backgroundColor:"transparent", color:"aliceblue", borderRadius:"6px" }}>{new Date().getFullYear()}</option>
            </select>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default Totalcustomerchart;
