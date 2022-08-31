/* eslint-disable react/jsx-fragments */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
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
            xaxis: {
                categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                axisBorder: {
                    show: false
                },
                // axisTicks: {
                //     show: false
                // }
            },
            legend: {
                show: false
            },
        },
    )

    const serie = [
        {
            name: 'Series C',
            data: [12000, 14000, 12000, 15000]
        }
    ]



    // eslint-disable-next-line lines-between-class-members
    return (
        <React.Fragment>
            <Card>
                <ReactApexChart options={state} series={serie} type="area" height="290" />
            </Card>
        </React.Fragment>
    );
}

export default Areachart;