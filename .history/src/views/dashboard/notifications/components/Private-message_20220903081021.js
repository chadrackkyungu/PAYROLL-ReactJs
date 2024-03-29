/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
// import { IoIosArrowDroprightCircle } from 'react-icons/io';

function PrivateMessage() {
    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;
    const [message, setMessage] = useState();

    const getNotification = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/v1/announcements/me", requestOptions)
            .then(response => response.json())
            .then(result => setMessage(result.data.announce))
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        getNotification();
    }, []);

    if (message === undefined) {
        return <Card>
            <h2 className="text-danger"> No Message for you yet </h2>
        </Card>

    }

    return (
        <div>
            {
                message?.map((details, i) => {
                    return (
                        <Card className="mb-3 p-4" key={i}>
                            <Row>
                                <Col md={10}>
                                    <Row>
                                        <Col md={2}>
                                            <div className="notification-img">
                                                <div className="sw-10 me-1 mb-1 d-inline-block">
                                                    <img src={details.admin.photo} className="img-fluid rounded-md" alt="" />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={10}>
                                            <h5>  <b className="text-primary"> Category : </b> {details.category}    </h5>
                                            <h6> <span className="text-danger"> Author : </span>  {details.admin.firstName}     </h6>
                                            <div className="notifications">
                                                <p>  {details.message} </p>
                                            </div>
                                            <h5>    Type :  {details.types}  </h5>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col md={2}>
                                    <b> {details.date} </b>
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

export default PrivateMessage