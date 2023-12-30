// QuestionChart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const QuestionChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/question/count-by-category');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const chartOptions = {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Question Count by Category'
        },
        xAxis: {
            categories: data.map(item => item[1]), // Assuming category is the second element in each array
            title: {
                text: 'Category'
            }
        },
        yAxis: {
            title: {
                text: 'Question Count'
            }
        },
        series: [
            {
                name: 'Count',
                data: data.map(item => item[0]) // Assuming count is the first element in each array
            }
        ]
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
};

export default QuestionChart;
