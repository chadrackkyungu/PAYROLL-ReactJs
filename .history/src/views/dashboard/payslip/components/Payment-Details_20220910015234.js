/* eslint-disable prettier/prettier */
import React from 'react'

function PaymentDetails({ details }) {

    console.log('====================================');
    console.log(details);
    console.log('====================================');

    return (
        <div>
            <p> <b> Number of hours worked : </b>  {details[0].hoursWork} </p>
            <p>{details[0].user.photo} </p>
            <p>{details[0].user.photo} </p>
        </div>
    )
}

export default PaymentDetails