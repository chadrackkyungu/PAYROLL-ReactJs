/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import Chart from "./Home/Chart";
import Cards from './Home/Cards';
import AdminCard from './Home/Admin-card';
import { getCurrentMonth, getJanuary, getFebuary, getMarch, getMay } from './Home/AllTotalMonthlySal';
import PieChart from "./Home/AllCahrt";

const Dashboard = () => {

    const title = 'Home Page';
    const description = 'An empty page with a fluid vertical layout.';
    const breadcrumbs = [{ to: '', text: 'Home' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });

    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;
    const userRole = currentUser?.data?.user?.role;
    const [payment, setPayment] = useState();
    // const todayDate = new Date().getMonth() + 1;
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

    if (payment === undefined) {
        return
    }

    const salary = payment?.map(pay => pay?.salaryAmount)
    const overtimeSalary = payment?.map(pay => pay?.overTimeAmount)
    const addSalary = salary?.reduce((a, b) => a + b);
    const addOvertime = overtimeSalary?.reduce((a, b) => a + b);
    const totalPayment = addSalary + addOvertime;
    const prevSalary = salary === undefined ? null : salary[salary?.length - 1];
    const prevSalaryOvertime = salary === undefined ? null : overtimeSalary[overtimeSalary?.length - 1];

    // const currentMonth = payment?.filter(e => {
    //     const [_, month] = e.paymentDate.split('-');
    //     return todayDate === +month;
    // });

    const currentMonth = getCurrentMonth(payment)
    const January = getJanuary(payment)
    const febuary = getFebuary(payment)
    const march = getMarch(payment)
    const may = getMay(payment)

    const salaryForThisMonth = currentMonth?.map(pay => pay?.salaryAmount)
    const overTimeForThisMonth = currentMonth?.map(pay => pay?.overTimeAmount)
    const totalSalaryForThisMonth = salaryForThisMonth?.reduce((a, b) => a + b);
    const totalOverTimeForThisMonth = overTimeForThisMonth?.reduce((a, b) => a + b);

    const JanuaryMonth = January?.map(pay => pay?.salaryAmount);
    const januaryOverMonth = January?.map(pay => pay?.overTimeAmount);
    const totalSalaryJanuary = JanuaryMonth?.reduce((a, b) => a + b);
    const totalOverTimeJanuary = januaryOverMonth?.reduce((a, b) => a + b);

    const febuaryMonth = febuary?.map(pay => pay?.salaryAmount);
    const febuaryOverMonth = febuary?.map(pay => pay?.overTimeAmount);
    const totalSalaryFeb = febuaryMonth?.reduce((a, b) => a + b);
    const totalOverTimeFeb = febuaryOverMonth?.reduce((a, b) => a + b);

    const marchMonth = march?.map(pay => pay?.salaryAmount);
    const marchOverMonth = march?.map(pay => pay?.overTimeAmount);
    const totalSalaryMarch = marchMonth?.reduce((a, b) => a + b);
    const totalOverTimeMarch = marchOverMonth?.reduce((a, b) => a + b);

    const mayMonth = may?.map(pay => pay?.salaryAmount);
    const mayOverMonth = may?.map(pay => pay?.overTimeAmount);
    const totalSalaryMay = mayMonth?.reduce((a, b) => a + b);
    const totalOverTimeMay = mayOverMonth?.reduce((a, b) => a + b);

    //* Total Payment, monthly + overtime, for the current month
    const totalSalaryOverTimeForThisMonth = totalSalaryForThisMonth + totalOverTimeForThisMonth;

    //* Total Payment, monthly + overtime, for the previous month
    const totalSalaryOverTimeForPrevMonth = totalSalaryMay + totalOverTimeMay;

    const Months = Object.values({
        totalSalaryForThisMonth,
        totalSalaryJanuary,
        totalSalaryFeb,
        totalSalaryMarch,
        totalSalaryMay
    });

    const MonthOvertime = Object.values({
        totalOverTimeForThisMonth,
        totalOverTimeJanuary,
        totalOverTimeFeb,
        totalOverTimeMarch,
        totalOverTimeMay
    });


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
                                    <Card className="mt-5 p-5">
                                        <Chart salary={salary} overTime={overtimeSalary} />
                                    </Card>

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

                                    <Row className="mt-5">
                                        <Col md={8}>
                                            <Card className="p-4">
                                                <Chart salary={Months} overTime={MonthOvertime} />
                                            </Card>
                                        </Col>
                                        <Col md={4}>
                                            <Card className="p-1">
                                                <PieChart
                                                    currentMonth={totalSalaryOverTimeForThisMonth}
                                                    prevMonth={totalSalaryOverTimeForPrevMonth}
                                                />
                                            </Card>
                                        </Col>
                                    </Row>
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
