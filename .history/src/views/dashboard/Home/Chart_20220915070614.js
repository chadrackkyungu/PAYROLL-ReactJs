/* eslint-disable consistent-return */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable react/jsx-fragments */
/* eslint-disable prettier/prettier */
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Spinner } from 'react-bootstrap';

const Areachart = ({ salary, overTime }) => {

    if (salary === undefined || overTime === undefined) {
        return <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
        </div>
    }

    const Months = {
        colors: ['#4B3AB8', '#f0f1f4'],
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
                // text: ""
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
            data: !salary ? null : salary
        },
        {
            name: 'Over Time Amount',
            data: !overTime ? null : overTime
        },
    ]

    if (Amount === undefined || Months === undefined) {
        return <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
        </div>
    }

    // eslint-disable-next-line lines-between-class-members
    return (
        <React.Fragment>
            <ReactApexChart options={Months} series={Amount} type="bar" height="290" />
        </React.Fragment>
    );
}

export default Areachart;