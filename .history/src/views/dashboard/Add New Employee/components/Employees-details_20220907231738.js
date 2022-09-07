/* eslint-disable prefer-object-spread */
/* eslint-disable prettier/prettier */
import React from 'react'

function EmployeesDetails({ details }) {
    const userDet = Object.assign({}, details);
    console.log(userDet)

    return (
        <div>
            <p> </p>
        </div>
    )
}

export default EmployeesDetails