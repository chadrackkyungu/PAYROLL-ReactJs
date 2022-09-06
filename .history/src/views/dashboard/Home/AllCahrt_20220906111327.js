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
                formatter: "{a} <br/>{b}: {c} ({d}%)",
            },
            legend: {
                orient: "vertical",
                // x: "left",
                data: ["January", "February", "March"],
                textStyle: {
                    color: ["#74788d"],
                },
            },
            color: ["#02a499", "#f8b425", "#ec4561"],
            series: [
                {
                    name: "Total sales",
                    type: "pie",
                    radius: ["50%", "70%"],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: "center",
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: "30",
                                fontWeight: "bold",
                            },
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false,
                        },
                    },
                    data: [
                        { value: 335, name: "January" },
                        { value: 310, name: "February" },
                        { value: 234, name: "March" },
                    ],
                },
            ],
        }
    }
    render() {
        return (
            <React.Fragment>
                <ReactEcharts option={this.getOption()} />
            </React.Fragment>
        )
    }
}
export default Doughnut
