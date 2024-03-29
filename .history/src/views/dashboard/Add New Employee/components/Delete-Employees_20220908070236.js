/* eslint-disable prettier/prettier */
import React from 'react'
import { useSelector } from 'react-redux';

function DeleteEmployees({ details }) {
    console.log(details._id);
    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;

    const deleteFunc = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);


        const raw = "";

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:5000/api/v1/users/${'i'}`, requestOptions)
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