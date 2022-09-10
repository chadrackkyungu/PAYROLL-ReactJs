/* eslint-disable prettier/prettier */
import React from 'react'

function PaymentDetails({ details }) {

    console.log('====================================');
    console.log(details);
    console.log('====================================');

    return (
        <div>
            <p> <b> Number of overtime hours worked : </b>  {details[0].hoursWork} </p>
            <p> <b> Overtime Salary Amount : </b>  {details[0].overTimeAmount} </p>
            <p> <b> Salary Amount : </b>  {details[0].salaryAmount} </p>
            <p> <b> Status : </b>  {details[0].status} </p>
            <p> <b> Payment date : </b>  {details[0].paymentDate} </p>
            <p>{details[0].user.photo} </p>
            <p>{details[0].user.photo} </p>
        </div>
    )
}

export default PaymentDetails