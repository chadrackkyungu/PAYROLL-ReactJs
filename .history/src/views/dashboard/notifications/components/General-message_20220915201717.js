/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Row, Col, Card, Spinner, Badge } from 'react-bootstrap';
// import { IoIosArrowDroprightCircle } from 'react-icons/io';

function GeneralMessage() {
    const urlUser = "https://polar-basin-47052.herokuapp.com/img/users/"
    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;
    const [message, setMessage] = useState();
    const todayDate = new Date().getDate();
    const monthDate = new Date().getMonth();

    const getNotification = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://polar-basin-47052.herokuapp.com/api/v1/announcements/me/general", requestOptions)
            .then(response => response.json())
            .then(result => setMessage(result.data.announce))
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        getNotification();
    }, []);

    if (message === undefined) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }

    if (message.length === 0) {
        return (
            <div className="d-flex justify-content-center">
                <h1 className="text-danger"> You do not have any notifications </h1>
            </div>
        )
    }

    return (
        <div>
            {
                message?.reverse()?.map((details, i) => {

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
                        </Card>
                    )
                }
                )
            }

        </div>
    )
}

export default GeneralMessage