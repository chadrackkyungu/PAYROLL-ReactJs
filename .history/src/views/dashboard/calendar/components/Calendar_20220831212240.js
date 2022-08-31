/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable prettier/prettier */
import React from 'react'

function Calendar() {
    return (
        <div className="text-center">
            <iframe src="https://calendar.google.com/calendar/embed?src=en.sa%23holiday%40group.v.calendar.google.com&ctz=Africa%2FJohannesburg" width="800" height="600" scrolling="no" className="ng-black" />
        </div>
    )
}

export default Calendar