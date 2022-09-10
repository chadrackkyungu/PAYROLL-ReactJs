/* eslint-disable prettier/prettier */
import React from 'react'
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Individual({ announcement }) {
    const urlUser = "http://localhost:5000/img/users/"

    console.log(announcement);
    return (
        <div>
            <Link to="/admin/send-announcement" className="btn btn-primary  my-5"> + Send a new announcement </Link>

            {
                announcement?.map((details, i) => {
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
                                    <b> {details?.date} </b>
                                </Col>
                            </Row>

                            <div className="mt-5">
                                <div className="sw-10 me-1 mb-1 d-inline-block">
                                    <img src={`${urlUser}${details?.user?.photo}`} className="img-fluid rounded-md" alt="" />
                                </div>
                                <h6> <span className="text-danger"> Employee : </span>  {details?.user?.firstName}    {details?.user?.lastName}    </h6>
                            </div>
                        </Card>
                    )
                }
                )
            }

        </div>
    )
}

export default Individual