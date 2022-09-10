/* eslint-disable prettier/prettier */
import React from 'react'
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function General({ announcement }) {
    const urlUser = "http://localhost:5000/img/users/"

    console.log(announcement);
    return (
        <div>
            <Link to="#/"> Send a new announcement </Link>
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
                                    {/* <p className="mt-4"> <Link to="#/"> <IoIosArrowDroprightCircle size={24} />  </Link> </p> */}
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

export default General