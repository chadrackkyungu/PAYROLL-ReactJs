/* eslint-disable no-unused-vars */
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
import AdminCard from './Home/Admin-card';

const Dashboard = () => {

    const title = 'Home Page';
    const description = 'An empty page with a fluid vertical layout.';
    const breadcrumbs = [{ to: '', text: 'Home' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });

    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;
    const userRole = currentUser?.data?.user?.role;
    const [payment, setPayment] = useState();
    const todayDate = new Date().getMonth() + 1;
    const userAPI = "http://localhost:5000/api/v1/payments/me";
    const adminAPI = "http://localhost:5000/api/v1/payments";

    const getPayslip = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(userRole === "admin" ? adminAPI : userAPI, requestOptions)
            .then(response => response.json())
            .then(result => {
                setPayment(userRole === "admin" ? result.data.data : result.data.leaves)
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
    const prevSalary = salary === undefined ? null : salary[salary?.length - 1];
    const prevSalaryOvertime = salary === undefined ? null : overtimeSalary[overtimeSalary?.length - 1];

    const currentMonth = payment?.filter(e => {
        const [_, month] = e.paymentDate.split('-');
        return todayDate === +month;
    });

    const salaryForThisMonth = currentMonth?.map(pay => pay?.salaryAmount)
    const overTimeForThisMonth = currentMonth?.map(pay => pay?.overTimeAmount)
    const totalSalaryForThisMonth = salaryForThisMonth?.reduce((a, b) => a + b);
    const totalOverTimeForThisMonth = overTimeForThisMonth?.reduce((a, b) => a + b);
    const totalSalaryOverTimeForThisMonth = totalSalaryForThisMonth + totalOverTimeForThisMonth;

    console.log("result", salaryForThisMonth)
    console.log("result", overTimeForThisMonth)

    return (
        <>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    <section className="scroll-section" id="title">
                        <div className="page-title-container">
                            <BreadcrumbList items={breadcrumbs} />
                        </div>
                        {
                            userRole === 'user' ? (
                                <>
                                    <Cards total={totalPayment} monthlySalary={prevSalary} overTimePrevMonth={prevSalaryOvertime} />
                                    <Chart salary={salary} overTime={overtimeSalary} />
                                </>
                            ) : (
                                <>
                                    <AdminCard
                                        total={totalPayment}
                                        totalYearSal={addSalary}
                                        totalYearOver={addOvertime}

                                        total_Monthly_Salary_Overtime={totalSalaryOverTimeForThisMonth}
                                        total_Monthly_Salary={totalSalaryForThisMonth}
                                        total_Monthly_Overtime={totalOverTimeForThisMonth}
                                    />
                                    {/* <Chart salary={salaryForThisMonth} overTime={overTimeForThisMonth} /> */}
                                </>
                            )
                        }
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default Dashboard;
