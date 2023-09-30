import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';



const PaintingsStatistics = () => {


        const chartRef = useRef();

        useEffect(() => {
        const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const data = {
            labels: labels,
            datasets: [
            {
                label: 'Temperature Trends',
                data: [25, 26, 24, 23, 27, 28, 22],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                label: 'Random Line 1',
                data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 30) + 1),
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            },
            {
                label: 'Random Line 2',
                data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 30) + 1),
                fill: false,
                borderColor: 'rgb(54, 162, 25)',
                tension: 0.1
            }
            ]
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
                    text: 'Period'
                }
                },
                y: {
                title: {
                    display: true,
                    text: 'Number'
                }
                }
            }
            }
        };

        const ctx = chartRef.current.getContext('2d');
        const myChart = new Chart(ctx, config);

        return () => {
            myChart.destroy(); // destroy the chart when component unmounts
        };
    }, []);



    return <canvas ref={chartRef} />;


    };


export default PaintingsStatistics;
