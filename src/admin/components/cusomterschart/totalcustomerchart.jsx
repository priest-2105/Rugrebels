import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; 
import { db } from '../../../backend/config/fire';
import { collection, getDocs } from 'firebase/firestore';

const Totalcustomerchart = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [availableYears, setAvailableYears] = useState([]);
    const chartRef = useRef(null);
    const myChart = useRef(null);

  
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customerRef = collection(db, 'admincustomerlist');
                const querySnapshot = await getDocs(customerRef);

                // Get available years from customer data
                const yearsSet = new Set();
                querySnapshot.forEach((doc) => {
                    const timestamp = doc.data().date;
                    const date = timestamp.toDate();
                    const year = date.getFullYear();
                    yearsSet.add(year);
                });
                const yearsArray = Array.from(yearsSet).sort();
                console.log(yearsArray);
                setAvailableYears(yearsArray);

                // Fetch data for selected year
                const customerData = Array.from({ length: 12 }, () => 0); 
                querySnapshot.forEach((doc) => {
                    const timestamp = doc.data().date; 
                    const date = timestamp.toDate();  
                    const year = date.getFullYear();  
                    const month = date.getMonth();
                
                    if (year === selectedYear) {
                        customerData[month] += 1;
                    }
                });

                if (myChart.current !== null) {
                    myChart.current.destroy();
                }

                const ctx = chartRef.current.getContext('2d');
                myChart.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: months,
                        datasets: [{
                            label: `Customer Data for ${selectedYear}`,
                            data: customerData,
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
                                    text: 'Number of Customers 🧟'
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
                console.error('Error fetching customer data:', error);
            }
        }
      

        fetchData();
    }, [selectedYear]);   
    
    const handleChangeYear = (event) => {
        const newSelectedYear = parseInt(event.target.value);
        setSelectedYear(newSelectedYear);
    }

    return (
        <div>
            <select value={selectedYear} onChange={handleChangeYear} style={{ marginLeft: "20px", backgroundColor: "transparent", color: "aliceblue", borderRadius: "6px" }}>
                {availableYears.map((year) => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default Totalcustomerchart;
