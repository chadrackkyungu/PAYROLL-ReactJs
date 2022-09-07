/* eslint-disable prefer-object-spread */
/* eslint-disable prettier/prettier */
import React from 'react'

function EmployeesDetails({ details }) {


    return (
        <div>
            <h4> Personal Details </h4>
            <p> {details[0].firstName} </p>
            <p> {details[0].lastName} </p>
            <p> {details[0].IdNumber} </p>
            <p> {details[0].phoneNumber} </p>
            <p> {details[0].gender} </p>
            <p> {details[0].dateOfBirth} </p>
            <p> {details[0].language} </p>

            <h4> Address Details </h4>
            <p> {details[0].city} </p>
            <p> {details[0].country} </p>
            <p> {details[0].houseNumber} </p>
            <p> {details[0].materialStatus} </p>
            <p> {details[0].streetAddress} </p>
            <p> {details[0].stateProvince} </p>
            <p> {details[0].zipCode} </p>

            <h4> Employee Details </h4>
            <p> {details[0].email} </p>
            <p> {details[0].role} </p>
            <p> {details[0].employeeNumber} </p>
            <p> {details[0].startDate} </p>

            <h4> Employee Account Details </h4>
            <p> {details[0].accountName} </p>
            <p> {details[0].accountNumber} </p>
            <p> {details[0].accountType} </p>
            <p> {details[0].branchName} </p>
        </div>
    )
}

export default EmployeesDetails