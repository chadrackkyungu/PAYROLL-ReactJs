/* eslint-disable prettier/prettier */
import React from 'react'
import { Row, Col } from 'react-bootstrap';

function PaymentDetails({ details }) {

    const urlUser = "http://localhost:5000/img/users/"
    const urlDoc = "http://localhost:5000/img/docs/"

    console.log(details);

    return (
        <div>
            <div className="mx-2">
                <p> <b> Pay slip ID : </b>  {details[0].id} </p>
                <div className="card hover-img-scale-up w-50 mb-4">
                    <img src={`${urlUser}${details[0]?.user?.photo}`} alt="user" className=" sh-25 scale cursor-pointer" />
                </div>
                <Row>
                    <Col md={6}>
                        <p> <b> Number of overtime hours worked : </b>  {details[0].hoursWork} </p>
                        <p> <b> Overtime Salary Amount : </b>  {details[0].overTimeAmount} </p>
                        <p> <b> Salary Amount : </b>  {details[0].salaryAmount} </p>
                        <p> <b> Status : </b>  {details[0].status} </p>
                        <p> <b> Payment date : </b>  {details[0].paymentDate} </p>
                    </Col>
                    <Col md={6}>
                        <h4 className="text-primary mb-5"> Employee Details </h4>
                        <p> Work Email :  {details[0].email} </p>
                        <p> Role : {details[0].role},  Employee Number : {details[0].employeeNumber} </p>
                        <p> Start Working Date {details[0].startDate} </p>
                    </Col>
                </Row>

            </div>


        </div>
    )
}

export default PaymentDetails