import React, { useEffect, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './index.css';

const SummaryPage = ({ task, onClickBack }) => {
    const { title, description, mode } = task;
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState(null);
    let feedback = '';
    let feedbackStyle = ''

    if(mode === 'Start'){
        feedback = "Your Task is not yet finished. Start Your work, finish the Task";
        feedbackStyle = 'startFeedback';
    } else if (mode === 'End') {
        feedback = "Your almost there. Complete the remaining work too.";
        feedbackStyle = 'endFeedback';
    } else if(mode === 'Complete'){
        feedback = "Woohoo! Your task is finished. Have a great day!"
        feedbackStyle = 'completeFeedback';
    }
    // Function to calculate data for the pie chart based on mode
    const getChartData = (mode) => {
        if (mode === 'Start') {
            return [50, 50];
        } else if (mode === 'End') {
            return [90, 10];
        } else if (mode === 'Complete') {
            return [100, 0];
        }
    };

    useEffect(() => {
        if (chartRef.current) {
            // If chart instance exists, destroy it
            if (chartRef.current.chartInstance) {
                chartRef.current.chartInstance.destroy();
            }

            // Create new chart instance
            chartRef.current.chartInstance = new Chart(chartRef.current, {
                type: 'pie',
                data: chartData,
            });
        }

        // Cleanup function
        return () => {
            if (chartRef.current && chartRef.current.chartInstance) {
                chartRef.current.chartInstance.destroy();
            }
        };
    }, [chartData]);

    useEffect(() => {
        // Calculate chart data based on mode
        const data = {
            labels: ['Completed', 'Remaining'],
            datasets: [
                {
                    data: getChartData(mode),
                    backgroundColor: ['#36A2EB', '#FF6384'],
                    hoverBackgroundColor: ['#36A2EB', '#FF6384'],
                },
            ],
        };

        setChartData(data);
    }, [mode]);

    return (
        <div className="summary-bg">
            <button type="button" className="back-btn" onClick={onClickBack}>
                Back
            </button>
            <div className='content-chart-container'>
            <div className="summary-content-part">
                <h2 className="summary-heading">{title} Summary</h2>
                <p className="summary-desc">Description: {description}</p>
            </div>
            <div className="chart-container">
                    <canvas ref={chartRef} />
            </div>
            </div>
            <p className={feedbackStyle}>{feedback}</p>
        </div>
    );
};

export default SummaryPage;