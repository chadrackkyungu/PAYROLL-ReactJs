/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-template */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Badge, Card, Modal, Button, Spinner } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import PaymentDetails from './components/Payment-Details';
import UpdatePaymentDetails from './components/Update-Payment';
import { warningMessage, successSubmitLeave } from "../../../components/Notifications/Notifications";


const Employees = () => {
    const { currentUser } = useSelector((state) => state.auth);
    const urlUser = "https://payroll.up.railway.app/img/users/"
    const title = 'Payment Employees List';
    const description = 'List of all paid employees';
    const breadcrumbs = [{ to: '', text: 'Paid Employees' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });

    const [lExample, setLExample] = useState(false);
    const [smExample, setSmExample] = useState(false);
    const [rightModalScrollExample, setRightModalScrollExample] = useState(false);
    const [statusUpdate, setStatusUpdate] = useState(false);

    const [paymentId, setPaymentId] = useState(false);
    const token = currentUser?.token;
    const [payment, setPayment] = useState()

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    useEffect(() => {
        const approved = () => {
            fetch(`https://payroll.up.railway.app/api/v1/payments`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setPayment(result?.data?.data)
                })
                .catch(error => console.log('error', error));
        }
        approved();
    }, []);

    const paymentdet = payment?.filter(employee => employee._id === paymentId);

    if (paymentdet === undefined || payment === undefined) {
        return <div>...</div>
    }

    const deleteFunc = async () => {
        const myHeader = new Headers();
        myHeader.append("Authorization", `Bearer ${token}`);

        const raw = "";
        const deleteRequest = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(`https://payroll.up.railway.app/api/v1/payments/${paymentdet[0]?._id}`, deleteRequest)
            .then(response => response.json())
            .then(result => {
                if (result.status === "fail") {
                    warningMessage(`This payment does not exist anymore`)
                }
            })
            .catch(err => {
                if (err.response === undefined) {
                    successSubmitLeave(`You have Successfully deleted this payment`)
                } else {
                    warningMessage(` 🤒 ${err.response}`)
                }
            });

        setSmExample(false)
    }

    //* Updating the user status
    const UpdateStatus = () => {
        const myHeader = new Headers();
        myHeader.append("Authorization", `Bearer ${token}`);
        myHeader.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "status": "Paid"
        });

        const requestUpdateStatus = {
            method: 'PATCH',
            headers: myHeader,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://payroll.up.railway.app/api/v1/payments/${paymentdet[0]?._id}/status`, requestUpdateStatus)
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    successSubmitLeave(`Successful updated payment status`)
                }
                if (result.status === "fail") {
                    warningMessage(`This payment does not exist anymore`)
                }
            })
            .catch(err => {
                warningMessage(` 🤒 ${err.response}`)
            });

        setStatusUpdate(false)
    }


    if (payment === undefined) {
        return (<div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
        </div>
        )
    }

    if (payment.length === 0) {
        return (
            <div className="d-flex justify-content-center">
                <h1 className="text-danger"> You have not yet paid any employees  </h1>
            </div>
        )
    }

    return (
        <>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    <section className="scroll-section" id="title">
                        <div className="page-title-container d-flex justify-content-between">
                            <BreadcrumbList items={breadcrumbs} />
                        </div>

                        <Card className="mt-5">
                            <div className="table-responsive p-4">
                                <table className="table align-middle table-nowrap mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th style={{ width: "20px" }}>
                                                <div className="form-check font-size-16 align-middle">
                                                    <input type="checkbox" className="form-check-input" id="customCheck1" />
                                                    <label className="form-check-label" htmlFor="customCheck1"> &nbsp;</label>
                                                </div>
                                            </th>
                                            <th className="align-middle">Pic</th>
                                            <th className="align-middle">Name</th>
                                            <th className="align-middle">Email</th>
                                            <th className="align-middle">Acc. No.</th>
                                            <th className="align-middle">Payment Date</th>
                                            <th className="align-middle">Status</th>
                                            <th className="align-middle">View</th>
                                            <th className="align-middle">Edit</th>
                                            <th className="align-middle">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payment?.map((empl, key) => {
                                            return (
                                                <tr key={"_tr_" + key} >
                                                    <td>
                                                        <div className="form-check font-size-16">
                                                            <input type="checkbox" className="form-check-input" id={empl?._id} />
                                                            <label className="form-check-label" htmlFor={empl?._id}> &nbsp;</label>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="sw-6 me-1 mb-1 d-inline-block ">
                                                            <img src={`${urlUser}${empl?.user?.photo}`} alt="user"
                                                                className="img-fluid rounded-xl" />
                                                        </div>
                                                    </td>

                                                    {/* <td>{empl?.user?.firstName} {empl?.user?.lastName}</td> */}
                                                    <td>{empl?.user?.firstName} </td>
                                                    <td>{empl?.user?.email}</td>
                                                    <td>{empl?.user?.accountNumber}</td>
                                                    <td>{empl?.paymentDate}</td>

                                                    <td><Badge className={`${empl?.status === 'pending' ? "bg-warning cursor-pointer" : "bg-primary"}  cursor-pointer`}
                                                        onClick={() => {
                                                            if (empl?.status === 'pending') {
                                                                setStatusUpdate(true)
                                                                setPaymentId(empl?._id)
                                                            }
                                                        }}> {empl?.status === "pending" ? null : <CsLineIcons icon="check" size="14" />} {empl?.status} {empl?.status === "pending" ? <CsLineIcons icon="pen" size="14" /> : null}   </Badge>
                                                    </td>


                                                    <td><Badge className='bg-success cursor-pointer'
                                                        onClick={() => {
                                                            setLExample(true)
                                                            setPaymentId(empl?._id)
                                                        }}> <CsLineIcons icon="eye" size="14" /> View  </Badge>
                                                    </td>

                                                    <td className="cursor-pointer"
                                                        onClick={() => {
                                                            if (empl.status === "pending") {
                                                                setRightModalScrollExample(true)
                                                                setPaymentId(empl._id);
                                                            }
                                                        }}> <Badge> {empl.status === "pending" ? <CsLineIcons icon="pen" size="14" /> : null}  {empl.status === "pending" ? "Edit" : null}  </Badge>
                                                    </td>

                                                    <td>
                                                        <Badge className="cursor-pointer" bg="outline-danger"
                                                            onClick={() => {
                                                                if (empl.status === "pending") {
                                                                    setSmExample(true)
                                                                    setPaymentId(empl?._id)
                                                                }
                                                            }}
                                                        >  {empl.status === "pending" ? <CsLineIcons icon="bin" size="14" /> : null}  {empl.status === "pending" ? "Delete" : null}  </Badge>
                                                    </td>
                                                </tr>
                                            )
                                        }


                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                    </section>
                </Col>
            </Row>

            {/* Modal View Details */}

            <Modal show={statusUpdate} onHide={() => setStatusUpdate(false)} size="sm-down">
                <Modal.Header closeButton>
                    <Modal.Title> Update Payments Status </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h4 className='text-warning'> Before updating  the status make sure the payment was successful done </h4>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-around">
                    <Button variant="primary" onClick={() => setStatusUpdate(false)}> No </Button>
                    <Button variant="danger" onClick={UpdateStatus}>Yes</Button>
                </Modal.Footer>
            </Modal>


            <Modal show={lExample} onHide={() => setLExample(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title> Payments Details </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <PaymentDetails details={paymentdet} />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={() => setLExample(false)}> Close </Button>
                </Modal.Footer>
            </Modal>



            {/* Modal Update details */}
            <Modal
                className="modal-right scroll-out-negative large" show={rightModalScrollExample} onHide={() => setRightModalScrollExample(false)}
                scrollable dialogClassName="full">

                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <OverlayScrollbarsComponent options={{ overflowBehavior: { x: 'hidden', y: 'scroll' } }} className="scroll-track-visible">
                        <UpdatePaymentDetails details={paymentdet} />
                    </OverlayScrollbarsComponent>
                </Modal.Body>

            </Modal>


            {/* Delete  Modal  */}
            <Modal show={smExample} onHide={() => setSmExample(false)} size="md">
                <Modal.Header closeButton>
                    <h2 className="text-warning"> Are you sure you want delete this employee ? </h2>
                </Modal.Header>

                <Modal.Footer className="d-flex justify-content-around">
                    <Button variant="secondary" onClick={() => setSmExample(false)}> No </Button>
                    <Button variant="danger" onClick={deleteFunc}>Yes</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default Employees;




