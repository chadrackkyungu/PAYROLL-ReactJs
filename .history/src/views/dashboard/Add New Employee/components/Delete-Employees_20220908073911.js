/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { warningMessage, successSubmitLeave } from "../../../../components/Notifications/Notifications";


function DeleteEmployees({ details, cancel }) {

    const [smExample, setSmExample] = useState(false);

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
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    successSubmitLeave(`Successfully Added the employee!!`)
                }
                if (result.status === "error") {
                    warningMessage(`This employee exist already in the system!!. try to add another employee`)
                }
            })
            .catch(err => warningMessage(` 🤒 ${err.response.data.message}`));
    }
    // useEffect(() => {
    //     deleteFunc();
    // }, []);


    return (
        <div>
            <Button variant="danger" onClick={deleteFunc}>Yes</Button>
        </div>
    )
}

export default DeleteEmployees