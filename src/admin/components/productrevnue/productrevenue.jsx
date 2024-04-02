import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; 
import { db } from '../../../backend/config/fire';
import { collection, getDocs } from 'firebase/firestore';

const TotalRevenuesAreaChart = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [availableYears, setAvailableYears] = useState([]);
    const [comparedYears, setComparedYears] = useState([]);
    const [filteredYears, setFilteredYears] = useState([]);
    const [inputYear, setInputYear] = useState('');
    const chartRef = useRef(null);
    const myChart = useRef(null);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const handleChangeYear = (event) => {
        setSelectedYear(parseInt(event.target.value));
    }

    const handleInputYearChange = (event) => {
        const inputText = event.target.value;
        setInputYear(inputText);
        console.log(inputText) 
        setFilteredYears(
            availableYears.filter(year => year.toString().includes(inputText))
        );console.log(filteredYears)
    }

    const handleAddYearToComparison = (year) => {
        if (comparedYears.length < 2 && !comparedYears.includes(year)) {
            setComparedYears([...comparedYears, year]);
        }
    }

    const handleAddYearToChart = (year) => {
        const newSelectedYear = parseInt(year);
        setFilteredYears([]);
        setInputYear('');

        if (myChart.current !== null) {
            const data = myChart.current.data;
            const newDataset = {
                label: `Total Revenue for ${year}`,
                data: Array.from({ length: 12 }, () => 0),
                fill: true,
                backgroundColor: 'rgba(921, 123, 15,0.1)',
                borderColor: 'rgba(921, 123, 15,9)',
                borderWidth: 1
            };
            data.datasets.push(newDataset);
            myChart.current.update();
        }
    }

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                const orderRef = collection(db, 'allordersadmin');
                const querySnapshot = await getDocs(orderRef);

                const revenueData = Array.from({ length: 12 }, () => 0); 
                querySnapshot.forEach((doc) => {
                    const timestamp = doc.data().date; 
                    const date = timestamp.toDate();  
                    const year = date.getFullYear();  
                    const month = date.getMonth();
                    const status = doc.data().status;

                    if (status === 'Delivered') {
                        // Assuming there is a field for price in your data
                        const price = doc.data().price; 
                        if (year === selectedYear) {
                            revenueData[month] += price;
                        }
                    }
                });

                if (myChart.current !== null) {
                    myChart.current.destroy();
                }

                const ctx = chartRef.current.getContext('2d');
                myChart.current = new Chart(ctx, {
                    type: 'line', // Changed to line chart
                    data: {
                        labels: months,
                        datasets: [{
                            label: `Total Revenue for ${selectedYear}`,
                            data: revenueData,
                            fill: true, // Fill the area under the line
                            backgroundColor: 'rgba(167, 213, 15,0.1)',
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
                                    text: 'Total Revenue ($)'
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
            } catch (error) {
                console.error('Error fetching revenue data:', error);
            }
        }

        fetchRevenueData();
    }, [selectedYear]);

    useEffect(() => {
        if (myChart.current !== null) {
            myChart.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        myChart.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: comparedYears.map(year => ({
                    label: `Total Revenue for ${year}`,
                    data: Array.from({ length: 12 }, () => 0),
                    fill: true,
                    backgroundColor: 'rgba(921, 123, 15,0.1)',
                    borderColor: 'rgba(921, 123, 15,9)',
                    borderWidth: 1
                })),
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Total Revenue'
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
    }, [comparedYears]);

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <select value={selectedYear} onChange={handleChangeYear} style={{ marginLeft: "20px", backgroundColor: "transparent", color: "aliceblue", borderRadius: "6px" }}>
                    {availableYears.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <input 
                    type="text"
                    placeholder="Type year..."
                    value={inputYear}
                    onChange={handleInputYearChange}
                    style={{ marginRight: "10px", backgroundColor: "transparent", color: "aliceblue", borderRadius: "6px", width: "120px" }}
                    className='ps-2 ms-auto'
               />
                <div>
                    {filteredYears.map((year) => (
                        <div 
                            key={year} 
                            onClick={() => handleAddYearToChart(year)}
                            style={{ cursor: 'pointer', color: 'blue', marginLeft: '10px' }}
                        >
                            {year}
                        </div>
                    ))}
                </div>
            </div>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default TotalRevenuesAreaChart;
