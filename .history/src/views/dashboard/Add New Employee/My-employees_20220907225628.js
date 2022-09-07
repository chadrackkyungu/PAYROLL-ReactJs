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
import { Row, Col, Badge, Card, Modal, Button } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';

// import UpdateLeave from "./components/UpdateLeave";
// import LeaveModalDetails from "./components/Leave-modal-details";


const Employees = () => {
    const { currentUser } = useSelector((state) => state.auth);

    const title = 'My Employees';
    const description = 'List of all my employees';
    const breadcrumbs = [{ to: '', text: 'My Employees' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });

    const [lExample, setLExample] = useState(false);
    const [rightModalExample, setRightModalExample] = useState(false);
    const [nExample, setNExample] = useState(false);

    const [leaveId, setLeaveId] = useState();
    const [ViewEmployee, setViewEmployee] = useState(false);
    const token = currentUser?.token;
    const [myEmployees, setEmployees] = useState()

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    useEffect(() => {
        const approved = () => {
            fetch(`http://localhost:5000/api/v1/users`, requestOptions)
                .then(response => response.json())
                .then(result => setEmployees(result.data.data))
                .catch(error => console.log('error', error));
        }
        approved();
    }, []);

    console.log(myEmployees);
    console.log(ViewEmployee);
    const employeeDet = myEmployees?.filter(employee => employee._id === ViewEmployee);

    console.log('====================================');
    console.log(employeeDet);
    console.log('====================================');

    return (
        <>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    <section className="scroll-section" id="title">
                        <div className="page-title-container d-flex justify-content-between">
                            <BreadcrumbList items={breadcrumbs} />
                        </div>

                        <Link to="/Admin/add-new-employee"> <button className='btn btn-primary'>   + Add new employee </button>  </Link>

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
                                            <th className="align-middle">Empl No</th>
                                            <th className="align-middle">Full Name</th>
                                            <th className="align-middle">phone Number</th>
                                            <th className="align-middle">Role</th>
                                            <th className="align-middle">Email</th>
                                            <th className="align-middle">Gender</th>
                                            <th className="align-middle">View</th>
                                            <th className="align-middle">Edit</th>
                                            <th className="align-middle">Pay</th>
                                            <th className="align-middle">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myEmployees?.map((empl, key) => (
                                            <tr key={"_tr_" + key}>
                                                <td>
                                                    <div className="form-check font-size-16">
                                                        <input type="checkbox" className="form-check-input" id={empl?._id} />
                                                        <label className="form-check-label" htmlFor={empl?._id}> &nbsp;</label>
                                                    </div>
                                                </td>
                                                <td>{empl.employeeNumber}</td>
                                                <td>{empl?.firstName} {empl?.lastName}</td>
                                                <td>{empl?.phoneNumber}</td>
                                                <td> <Badge className="bg-info"> {empl?.role} </Badge> </td>
                                                <td>{empl?.email}</td>
                                                <td>{empl?.gender}</td>
                                                <td><Badge className='bg-success cursor-pointer'
                                                    onClick={() => {
                                                        setNExample(true)
                                                        setViewEmployee(empl?._id)
                                                    }}> <CsLineIcons icon="eye" size="14" /> View  </Badge></td>

                                                <td className="cursor-pointer"
                                                    onClick={() => {
                                                        setRightModalExample(true)
                                                        setLeaveId(empl._id);
                                                    }}> <Badge> <CsLineIcons icon="pen" size="12" /> Edit </Badge>
                                                </td>

                                                <td>
                                                    <Badge className="cursor-pointer bg-info"> <CsLineIcons icon="dollar" size="14" /> Pay Now</Badge>
                                                </td>
                                                <td>
                                                    <Badge className="bg-danger cursor-pointer"
                                                        onClick={() => {

                                                        }}
                                                    >  <CsLineIcons icon="bin" size="14" /> Delete </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                    </section>
                </Col>
            </Row>

            <Modal show={lExample} onHide={() => setLExample(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>...</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setLExample(false)}>
                        Close
                    </Button>
                    <Button onClick={() => setLExample(false)}>Understood</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={nExample} onHide={() => setNExample(false)}>
                <Modal.Body>
                    {/* <LeaveModalDetails leaves={myLeaves} id={ViewLeave} /> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setNExample(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default Employees;




