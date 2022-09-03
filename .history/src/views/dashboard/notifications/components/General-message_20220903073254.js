/* eslint-disable prettier/prettier */
import React from 'react'
import { Row, Col, Card } from 'react-bootstrap';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { Link } from "react-router-dom";
import { Person } from "../../../APIs/Notifications";


function GeneralMessage() {

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer null");
    myHeaders.append("Cookie", "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDI4YzgwNjFmZmE5MTY4OTAwMjdiYyIsImlhdCI6MTY2MjEyOTI2NSwiZXhwIjoxNjY5OTA1MjY1fQ.pjN7_aQ3GWY1juv-Z73fQ-nWLFt7o7uhyEbjdLQEWis");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://localhost:5000/api/v1/announcements/me/general", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    return (
        <div>
            {
                Person.map((details, i) =>
                    <Card className="mb-3 p-3" key={i}>
                        <Row>
                            <Col md={10}>
                                <Row>
                                    <Col md={2}>
                                        <div className="notification-img">
                                            <div className="sw-10 me-1 mb-1 d-inline-block">
                                                <img src={details.photo} className="img-fluid rounded-md" alt="thumb" />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={10}>
                                        <h4>  {details.firstName} {details.lastName}   </h4>
                                        <div className="notifications">
                                            <p>  {details.message} </p>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>

                            <Col md={2}>
                                <b> {details.date} </b>
                                <p className="mt-4"> <Link to="#/"> <IoIosArrowDroprightCircle size={24} />  </Link> </p>
                            </Col>
                        </Row>
                    </Card>
                )
            }

        </div>
    )
}

export default GeneralMessage