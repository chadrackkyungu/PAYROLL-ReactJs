/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import Chart from "./Home/Chart";
import Cards from './Home/Cards';

const Dashboard = () => {

    const title = 'Home Page';
    const description = 'An empty page with a fluid vertical layout.';
    const breadcrumbs = [{ to: '', text: 'Home' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });

    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;
    const [payment, setPayment] = useState();

    const getPayslip = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/v1/payments/me", requestOptions)
            .then(response => response.json())
            .then(result => {
                setPayment(result.data.leaves)
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        getPayslip();
    }, []);

    const salary = payment?.map(pay => pay?.salaryAmount)
    const overtimeSalary = payment?.map(pay => pay?.overTimeAmount)
    const addSalary = salary?.reduce((a, b) => a + b);
    const addOvertime = overtimeSalary?.reduce((a, b) => a + b);
    const totalPayment = addSalary + addOvertime;

    let prevSalary = 0;
    let prevSalaryOvertime = 0;
    if (!salary || !overtimeSalary) {
        prevSalary = salary[salary?.length - 1];
        prevSalaryOvertime = overtimeSalary[overtimeSalary?.length - 1];
    }

    return (
        <>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    <section className="scroll-section" id="title">
                        <div className="page-title-container">
                            <BreadcrumbList items={breadcrumbs} />
                        </div>
                        <Cards total={totalPayment} monthlySalary={prevSalary} overTimePrevMonth={prevSalaryOvertime} />
                        <Chart salary={salary} overTime={overtimeSalary} />
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default Dashboard;