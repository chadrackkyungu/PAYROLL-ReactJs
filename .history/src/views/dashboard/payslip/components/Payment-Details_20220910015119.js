/* eslint-disable prettier/prettier */
import React from 'react'

function PaymentDetails({ details }) {

    console.log('====================================');
    console.log(details);
    console.log('====================================');

    return (
        <div>
            <p>{details[0].user.photo} </p>
        </div>
    )
}

export default PaymentDetails