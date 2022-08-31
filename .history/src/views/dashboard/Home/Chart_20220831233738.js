/* eslint-disable react/jsx-fragments */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Areachart = () => {

    const [state, setState] = useState(
        {
            colors: ['#ccc'],
            chart: {
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 0.1,
            },
            grid: {
                borderColor: '#f8f8fa',
                row: {
                    colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'],
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            legend: {
                show: false
            },
        },
    )

    const serie = [
        {
            name: 'Series C',
            data: [500, 7000, 9000, 10000, 12000, 14000, 150000]
        }
    ]



    // eslint-disable-next-line lines-between-class-members
    return (
        <React.Fragment>
            <ReactApexChart options={state} series={serie} type="area" height="290" />
        </React.Fragment>
    );
}

export default Areachart;