/* eslint-disable prefer-object-spread */
/* eslint-disable prettier/prettier */
import React from 'react'

function EmployeesDetails({ details }) {

    const userDet = Object.assign({}, details);
    console.log(userDet)

    return (
        <div>
            <p> {userDet?.lastName} </p>
            <p> {userDet?.firstName} </p>
            <p> {userDet?.IdNumber} </p>
            <p> {userDet?.accountName} </p>
            <p> {userDet?.accountNumber} </p>
            <p> {userDet?.accountType} </p>
            <p> {userDet?.branchName} </p>
            <p> {userDet?.city} </p>
            <p> {userDet?.country} </p>
            <p> {userDet?.dateOfBirth} </p>
            <p> {userDet?.email} </p>
            <p> {userDet?.gender} </p>
            <p> {userDet?.houseNumber} </p>
            <p> {userDet?.language} </p>
            <p> {userDet?.materialStatus} </p>
            <p> {userDet?.role} </p>
            <p> {userDet?.startDate} </p>
            <p> {userDet?.stateProvince} </p>
            <p> {userDet?.zipCode} </p>
        </div>
    )
}

export default EmployeesDetails