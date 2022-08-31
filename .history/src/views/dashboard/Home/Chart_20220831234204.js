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
                width: 0.3,
            },
            // grid: {
            //     borderColor: '#f8f8fa',
            //     row: {
            //         colors: ['transparent', 'transparent'], 
            //         opacity: 0.8
            //     },
            // },
            xaxis: {
                categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
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
            data: [12000, 13000, 14000, 15000]
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