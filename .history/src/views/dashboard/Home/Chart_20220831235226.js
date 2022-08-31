/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable react/jsx-fragments */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Card } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';

const Areachart = () => {

    const Months = {
        colors: ['#3c4ccf', '#f0f1f4'],
        chart: {
            stacked: true,
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                columnWidth: '40%',
            },
        },
        grid: {
            borderColor: '#f8f8fa',
            row: {
                colors: ['transparent', 'transparent'],
                opacity: 0.5
            },
        },

        xaxis: {
            categories: ["january", "february", "march", "april", "may", "jun", "july", "august", "september", "october", "november", "december"],
            labels: {
                formatter: function (val) {
                    return val
                },
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            title: {
                text: undefined
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val
                }
            }
        },
        fill: {
            opacity: 1
        },

        legend: {
            show: false,
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
        }
    }


    const Amount = [
        {
            name: 'Salary Amount',
            data: [14000, 1200, 13000, 14000]
        },
        {
            name: 'Over Time',
            data: [1000, 3003, 2000, 1000]
        },
    ]

    // eslint-disable-next-line lines-between-class-members
    return (
        <React.Fragment>
            <Card>
                <ReactApexChart options={Months} series={Amount} type="bar" height="290" />
            </Card>
        </React.Fragment>
    );
}

export default Areachart;