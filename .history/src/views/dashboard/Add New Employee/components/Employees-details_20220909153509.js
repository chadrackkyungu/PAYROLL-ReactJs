/* eslint-disable prefer-object-spread */
/* eslint-disable prettier/prettier */
import React from 'react'
import { Row, Col } from 'react-bootstrap';

function EmployeesDetails({ details }) {

    const urlUser = "http://localhost:5000/img/users/"

    return (
        <div>
            <div>
                <div className="sw-10 me-1 mb-1 d-inline-block">
                    <img src={`${urlUser}${details[0].photo}`} alt="user" className="card-img sh-25 scale cursor-pointer" />
                </div>
                <Row>
                    <Col md={6}>
                        <h4 className="text-primary mb-5"> Personal Details </h4>
                        <p> Employee Full name : {details[0].firstName} {details[0].lastName} </p>
                        <p> ID Number : {details[0].IdNumber} </p>
                        <p> Phone Number : {details[0].phoneNumber} </p>
                        <p>  Gender : {details[0].gender},  Language : {details[0].language}</p>
                        <p> {details[0].dateOfBirth} </p>
                    </Col>
                    <Col md={6}>
                        <h4 className="text-primary mb-5"> Employee Details </h4>
                        <p> Work Email :  {details[0].email} </p>
                        <p> Role : {details[0].role},  Employee Number : {details[0].employeeNumber} </p>
                        <p> Start Working Date {details[0].startDate} </p>
                    </Col>
                </Row>

            </div>

            <Row>
                <Col md={6}>
                    <h4 className="text-primary mb-5 mt-5"> Address Details </h4>
                    <p>Country : {details[0].country},  City : {details[0].city} </p>
                    <p> Hose Number :  {details[0].houseNumber} , Zip Code : {details[0].zipCode} </p>
                    <p> Material Status : {details[0].materialStatus} </p>
                    <p> Address : {details[0].streetAddress} </p>
                    <p> State or Province :  {details[0].stateProvince} </p>
                </Col>
                <Col md={6}>
                    <h4 className="text-primary mb-5 mt-5"> Employee Account Details </h4>
                    <p> Account Name : {details[0].accountName} </p>
                    <p> Account Number :  {details[0].accountNumber} </p>
                    <p> Account Type :  {details[0].accountType} </p>
                    <p> Account Branch : {details[0].branchName} </p>
                </Col>
            </Row>

        </div>
    )
}

export default EmployeesDetails