/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-fragments */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {

    const data = {
        labels: [
            "Desktops",
            "Tablets"
        ],
        datasets: [
            {
                data: [300, 180],
                backgroundColor: [
                    "#02a499",
                    "#ebeff2"
                ],
                hoverBackgroundColor: [
                    "#02a499",
                    "#ebeff2"
                ],
                hoverBorderColor: "#fff"
            }]
    };

    const option = {
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    const dataset = data.datasets[tooltipItem.datasetIndex];
                    const meta = dataset._meta[Object.keys(dataset._meta)[0]];
                    const total = meta.total;
                    const currentValue = dataset.data[tooltipItem.index];
                    const percentage = parseFloat((currentValue / total * 100).toFixed(1));
                    return currentValue + ' (' + percentage + '%)';
                },
                title: function (tooltipItem, data) {
                    return data.labels[tooltipItem[0].index];
                }
            }
        }
    }

    return (
        <React.Fragment>
            <Pie width={600} height={215} data={data} options={option} />
        </React.Fragment>
    );
}

export default PieChart;   