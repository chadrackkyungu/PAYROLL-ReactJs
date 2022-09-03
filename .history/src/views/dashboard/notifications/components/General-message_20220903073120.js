/* eslint-disable prettier/prettier */
import React from 'react'
import { Row, Col, Card } from 'react-bootstrap';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { Link } from "react-router-dom";
import { Person } from "../../../APIs/Notifications";


function GeneralMessage() {
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