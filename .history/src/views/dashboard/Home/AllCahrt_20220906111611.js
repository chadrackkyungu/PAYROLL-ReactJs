/* eslint-disable react/jsx-fragments */
/* eslint-disable lines-between-class-members */
/* eslint-disable prettier/prettier */
import React, { Component } from "react"
import ReactEcharts from "echarts-for-react"

class Doughnut extends Component {
    getOption = () => {
        return {
            toolbox: {
                show: false,
            },
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)",
            },
            legend: {
                orient: "vertical",
                left: "left",
                data: ["Laptop", "Tablet", "Mobile"],
                textStyle: {
                    color: ["#74788d"],
                },
            },
            color: ["#ec4561", "#38a4f8", "#3c4ccf"],
            series: [
                {
                    name: "Total sales",
                    type: "pie",
                    radius: "55%",
                    center: ["50%", "60%"],
                    data: [
                        { value: 335, name: "Laptop" },
                        { value: 310, name: "Tablet" },
                        { value: 234, name: "Mobile" },
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                },
            ],
        }
    }
    render() {
        return (
            <React.Fragment>
                <ReactEcharts style={{ height: "350px" }} option={this.getOption()} />
            </React.Fragment>
        )
    }
}
export default Doughnut