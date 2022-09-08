/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { warningMessage, successSubmitLeave } from "../../../../components/Notifications/Notifications";


function DeleteEmployees({ details }) {

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
        {/* Modal  Launch Small */ }
        < Modal show = { smExample } onHide = {() => setSmExample(false)
} size = "sm" >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>...</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSmExample(false)}>
                        Close
                    </Button>
                    <Button onClick={() => setSmExample(false)}>Understood</Button>
                </Modal.Footer>
            </Modal >
    )
}

export default DeleteEmployees