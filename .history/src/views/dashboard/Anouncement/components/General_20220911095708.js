/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { Row, Col, Card, Badge, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function General({ announcement }) {
    const urlUser = "http://localhost:5000/img/users/"

    const [smExample, setSmExample] = useState(false);
    const [MessageId, setMessageId] = useState(false);

    const deleteMessage = (id) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMThmMjg3NDUxZWJkYWJkYzk5ZDZjNyIsImlhdCI6MTY2Mjc1NjAyOCwiZXhwIjoxNjcwNTMyMDI4fQ.3oZ90JY4IYcaY5DTj3QPrenIbGAZLyhCnmjJ5Gtk31Y");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "category": "Sport",
            "types": "Bad attitude",
            "message": "As the name implies, findOneAndUpdate() finds the first document that matches a given filter, applies an update, and returns the document. By default, findOneAndUpdate() returns the document as it was before update was applied."
        });

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:5000/api/v1/announcements/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        setMessageId(false)
    }

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
                                    {/* <p className="mt-4"> <Link to="#/"> <IoIosArrowDroprightCircle size={24} />  </Link> </p> */}
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-end">
                                <Badge bg="outline-primary" className="me-3 cursor-pointer">Edit</Badge>
                                <Badge bg="outline-danger" className="cursor-pointer" onClick={() => setSmExample(true)}>Delete</Badge>
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
                    <Button variant="danger" onClick={() => deleteMessage()}>Yes</Button>
                </Modal.Footer>
            </Modal>


        </div>
    )
}

export default General