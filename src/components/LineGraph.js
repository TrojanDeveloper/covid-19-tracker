import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral'
import './lineGraph.css'

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        }
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0.0");
            }
        }
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll"
                },
            },
        ],
        yAxes: [{
            gridLines: {
                display: false
            },
            ticks: {
                callback: function (value, index, values) {
                    return numeral(value).format("0a")
                },
            }
        }],
    }

}

const LineGraph = ({ caseType }) => {
    const [data, setData] = useState()

    const buildChartData = (data, caseType) => {
        const charData = [];
        let lastDataPoint;
        for (const date in data[caseType]) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[caseType][date] - lastDataPoint
                }
                charData.push(newDataPoint)
            }
            lastDataPoint = data[caseType][date];
        }
        return charData
    }

    useEffect(() => {
        const URL = 'https://disease.sh/v3/covid-19/historical/all?lastdays=150'
        const getData = async () => {
            await fetch(URL)
                .then(res => res.json())
                .then(data => {
                    const chartData = buildChartData(data, caseType)
                    setData(chartData)
                })
                .catch(err => console.log(err))
        }
        getData()
    }, [caseType])

    return (
        <div className='graph'>
            <h3 className='graph__title'>worldwide new {caseType}</h3>
            {data?.length > 0 && (
                <Line
                    options={options}
                    data={
                        {
                            datasets: [
                                {
                                    backgroundColor: "rgba(204, 16, 52, 0.5)",
                                    borderColor: "#CC1034",
                                    data: data
                                }
                            ]
                        }

                    } />)}
        </div>
    );
};

LineGraph.propTypes = {

};

export default LineGraph;