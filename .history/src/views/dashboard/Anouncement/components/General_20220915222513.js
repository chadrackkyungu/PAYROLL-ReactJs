/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Row, Col, Card, Badge, Button, Modal, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { successMessage } from "../../../../components/Notifications/Notifications";

function General({ announcement }) {
    const urlUser = "https://payroll.up.railway.app/img/users/"
    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;

    const [smExample, setSmExample] = useState(false);
    const [MessageId, setMessageId] = useState();
    const todayDate = new Date().getDate();
    const monthDate = new Date().getMonth();

    const deleteMessage = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        const raw = ""

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://payroll.up.railway.app/api/v1/announcements/${MessageId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 'success') {
                    successMessage(`You have successful deleted this announcement`)
                    window.location.reload();
                }
                if (result.status === 'fail') {
                    successMessage(`You have successful deleted this announcement`)
                }
            })
            .catch(err => console.log(` 🤒 ${err.response}`))

        setSmExample(false)
        successMessage(`You have successful deleted this announcement`)
    }




    return (
        <div>
            <Link to="/admin/send-announcement" className="btn btn-primary  my-5"> + Send a new announcement </Link>

            {
                announcement?.reverse()?.map((details, i) => {

                    const getDate = new Date(details?.date).getDate()
                    const getMonth = new Date(details?.date).getMonth()

                    return (
                        <Card className="mb-3 p-4" key={i}>
                            <Row>
                                <Col md={10}>
                                    <Row>
                                        <Col md={2}>
                                            <div className="notification-img">
                                                <div className="sw-10 me-1 mb-1 d-inline-block">
                                                    <img src={`${urlUser}${details?.admin?.photo}`} className="img-fluid rounded-md" alt="" />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={10}>
                                            <h5>  <b className="text-primary"> Category : </b> {details?.category}    </h5>
                                            <h6> <span className="text-danger"> Author : </span>  {details?.admin?.firstName}     </h6>
                                            <div className="notifications">
                                                <p>  {details?.message} </p>
                                            </div>
                                            <h5>    Type :  {details?.types}  </h5>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col md={2}>
                                    <p> {getDate === todayDate && getMonth === monthDate ? <Badge>New</Badge> : null} </p>
                                    <b> {details?.date} </b>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-end">
                                {/* <Badge bg="outline-primary" className="me-3 cursor-pointer">Edit</Badge> */}
                                <Badge bg="outline-danger" className="cursor-pointer"
                                    onClick={() => {
                                        setSmExample(true)
                                        setMessageId(details?._id)
                                    }}>
                                    Delete</Badge>
                            </div>
                        </Card>
                    )
                }
                )

            }

            <Modal show={smExample} onHide={() => setSmExample(false)} size="sm">
                <Modal.Body className="text-warning"> Are you sure you want to delete this message ? </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={() => setSmExample(false)}>No</Button>
                    <Button variant="danger" onClick={deleteMessage} >Yes</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default General