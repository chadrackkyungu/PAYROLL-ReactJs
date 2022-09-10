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
import { Link } from 'react-router-dom';
import { Row, Col, Badge, Card, Modal, Button, Spinner } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
// import EmployeesDetails from '../components/Employees-details';
// import UpdateEmployeesDetails from './components/UpdateEmplDetails';
// import UploadEmployeePasswords from './components/UploadEmployeePasswords';
import { warningMessage, successSubmitLeave } from "../../../components/Notifications/Notifications";


const Employees = () => {
    const { currentUser } = useSelector((state) => state.auth);
    const urlUser = "http://localhost:5000/img/users/"
    const title = 'Payment Employees List';
    const description = 'List of all paid employees';
    const breadcrumbs = [{ to: '', text: 'Paid Employees' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });

    const [lExample, setLExample] = useState(false);
    const [smExample, setSmExample] = useState(false);
    const [rightModalScrollExample, setRightModalScrollExample] = useState(false);

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
            fetch(`http://localhost:5000/api/v1/payments`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setPayment(result?.data?.data)
                })
                .catch(error => console.log('error', error));
        }
        approved();
    }, []);

    const paymentdet = payment?.filter(employee => employee._id === paymentId);
    console.log('====================================');
    console.log(paymentdet);
    console.log('====================================');

    console.log("All list of payment : ", payment);

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
        fetch(`http://localhost:5000/api/v1/users/${paymentdet._id}`, deleteRequest)
            .then(response => response.json())
            .then(result => {
                if (result.status === "fail") {
                    warningMessage(`This employee does not exist anymore`)
                }
            })
            .catch(err => {
                if (err.response === undefined) {
                    successSubmitLeave(`You have Successfully deleted this employee`)
                } else {
                    warningMessage(` 🤒 ${err.response}`)
                }
            });

        setSmExample(false)
    }

    if (payment === undefined) {
        return (<div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
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
                                            <th className="align-middle">Full Name</th>
                                            <th className="align-middle">Email</th>
                                            <th className="align-middle">Acc. No.</th>
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

                                                    <td>{empl?.user?.firstName} {empl?.user?.lastName}</td>
                                                    <td>{empl?.user?.email}</td>
                                                    <td>{empl?.user?.accountNumber}</td>

                                                    <td><Badge className={`${empl?.status === 'pending' ? "bg-warning cursor-pointer" : "bg-primary"}  cursor-pointer`}
                                                        onClick={() => {
                                                            if (empl?.status === 'pending') {
                                                                setLExample(true)
                                                                setPaymentId(empl?._id)
                                                            }
                                                        }}> {empl?.status === "pending" ? null : <CsLineIcons icon="check" size="14" />} {empl?.status} {empl?.status === "pending" ? <CsLineIcons icon="pen" size="18" /> : null}   </Badge>
                                                    </td>


                                                    <td><Badge className='bg-success cursor-pointer'
                                                        onClick={() => {
                                                            setLExample(true)
                                                            setPaymentId(empl?._id)
                                                        }}> <CsLineIcons icon="eye" size="14" /> View  </Badge>
                                                    </td>

                                                    <td className="cursor-pointer"
                                                        onClick={() => {
                                                            setRightModalScrollExample(true)
                                                            setPaymentId(empl._id);
                                                        }}> <Badge> <CsLineIcons icon="pen" size="12" /> Edit   </Badge>
                                                    </td>

                                                    <td>
                                                        <Badge className="bg-danger cursor-pointer"
                                                            onClick={() => {
                                                                setSmExample(true)
                                                                setPaymentId(empl?._id)
                                                            }}
                                                        >  <CsLineIcons icon="bin" size="14" /> Delete </Badge>
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

            <Modal show={lExample} onHide={() => setLExample(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title> Employee Details </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {/* <EmployeesDetails details={paymentdet} /> */}
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
                        {/* <UpdateEmployeesDetails details={paymentdet} /> */}

                        <br />
                        <br />
                        <br />
                        <br />

                        {/* <UploadEmployeePasswords details={paymentdet} /> */}
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




