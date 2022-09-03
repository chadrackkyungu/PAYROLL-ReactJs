/* eslint-disable prettier/prettier */
import React from 'react'

function LeaveModalDetails(props) {
    const { leaves, id } = props

    const leave = leaves.filter(lv => { return lv.id === id })
    const leaveObj = Object.assign(...leave);
    console.log(leaveObj);

    console.log(leaves, id);

    return (
        <div> Leave-modal-details </div>
    )
}

export default LeaveModalDetails