/* eslint-disable prettier/prettier */
import React from 'react'

function DeleteEmployees({ details }) {
    console.log(details);

    const deleteFunc = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDA3MjhmMzhkZTg3OGM0NWNlNzM2NiIsImlhdCI6MTY2MjU4MTYyMSwiZXhwIjoxNjcwMzU3NjIxfQ.wU6B-a5T6lQCMZg1tFv88p398eh-00jMPDIQyUjF_bc");


        const raw = "";

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:5000/api/v1/users/${}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }


    return (
        <div>
            hey
        </div>
    )
}

export default DeleteEmployees