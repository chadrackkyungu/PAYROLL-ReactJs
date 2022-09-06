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
                data: ["Current Month", "Prev Month"],
                textStyle: {
                    color: ["#74788d"],
                },
            },
            color: ["#3c4ccf", "#ec4561"],
            series: [
                {
                    name: "Payment for",
                    type: "pie",
                    radius: "55%",
                    center: ["50%", "60%"],
                    data: [
                        { value: 335, name: "Current Month" },
                        { value: 310, name: "Prev Month" },
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 5,
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