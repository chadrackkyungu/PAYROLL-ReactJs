/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

function DeleteEmployees({ details }) {

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

        fetch(`http://localhost:5000/api/v1/users/${details[0]._id}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        deleteFunc();
    }, []);


    return (
        <div>
            hey
        </div>
    )
}

export default DeleteEmployees