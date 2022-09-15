/* eslint-disable prefer-template */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { Badge, Card, Modal, Button } from 'react-bootstrap';
import { warningMessage, successSubmitLeave } from "../../../../components/Notifications/Notifications";

function PendingTable(props) {
    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;

    const [rightModalExample, setRightModalExample] = useState(false);
    const [declineModal, setDeclineModal] = useState(false);
    const [leaveId, setLeaveId] = useState();


    //* Approved
    const ApprovedLeave = () => {
        const myHeader = new Headers();
        myHeader.append("Authorization", `Bearer ${token}`);
        myHeader.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "status": "approved"
        });

        const requestUpdateStatus = {
            method: 'PATCH',
            headers: myHeader,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://polar-basin-47052.herokuapp.com/api/v1/leaves/${leaveId}/status`, requestUpdateStatus)
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    successSubmitLeave(`You have successful approved this leave`)
                }
                if (result.status === "fail") {
                    warningMessage(`This leave couldn't be approved`)
                }
            })
            .catch(err => {
                warningMessage(` 🤒 ${err.response}`)
            });

        setRightModalExample(false)
    }


    //* Declined
    const DeclinedLeave = () => {
        const myHeader = new Headers();
        myHeader.append("Authorization", `Bearer ${token}`);
        myHeader.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "status": "decline"
        });

        const requestUpdateStatus = {
            method: 'PATCH',
            headers: myHeader,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:5000/api/v1/leaves/${leaveId}/status`, requestUpdateStatus)
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    successSubmitLeave(`This leave was successful declined`)
                    window.setTimeout(() => {
                        window.location.reload();
                    }, 4000);
                }
                if (result.status === "fail") {
                    warningMessage(`This leave couldn't be declined`)
                }
            })
            .catch(err => {
                warningMessage(` 🤒 ${err.response}`)
            });

        setDeclineModal(false)
    }

    return (
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
                            <th className="align-middle">Leave ID</th>
                            <th className="align-middle">Starting dat</th>
                            <th className="align-middle">Ending date</th>
                            <th className="align-middle">Type</th>
                            <th className="align-middle">Status</th>
                            <th className="align-middle">Action</th>
                            <th className="align-middle">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data?.reverse()?.map((leave, key) => (
                            <tr key={"_tr_" + key}>
                                <td>
                                    <div className="form-check font-size-16">
                                        <input type="checkbox" className="form-check-input" id={leave.id} />
                                        <label className="form-check-label" htmlFor={leave.id}> &nbsp;</label>
                                    </div>
                                </td>
                                <td>{leave.id}</td>
                                <td>{leave.leaveStartDate}</td>
                                <td>{leave.leaveEndDate}</td>
                                <td>{leave.leaveType}</td>
                                <td><Badge className={"bg-warning font-size-11 badge-soft-" + leave.badgeClass} color={leave.badgeClass} pill>{leave.status}</Badge> </td>

                                <td>
                                    <Badge className={`px-3 pe-auto cursor-pointer ${leave.status === "pending" ? "bg-primary" : "bg-light text-danger"}`}
                                        onClick={() => {
                                            if (leave.status === "pending") {
                                                setRightModalExample(true)
                                                setLeaveId(leave.id);
                                            }
                                        }}
                                    > {leave.status === "pending" ? "Approve" : "no action"} <CsLineIcons icon="arrow-right" size="12" /> </Badge>
                                </td>

                                <td>
                                    <Badge className={`px-3 pe-auto cursor-pointer ${leave.status === "pending" ? "bg-danger" : "bg-light text-danger"}`}
                                        onClick={() => {
                                            if (leave.status === "pending") {
                                                setDeclineModal(true)
                                                setLeaveId(leave.id);
                                            }
                                        }}
                                    > {leave.status === "pending" ? "Declined" : "no action"} <CsLineIcons icon="close" size="12" /> </Badge>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal show={rightModalExample} onHide={() => setRightModalExample(false)}>
                <Modal.Body>
                    <h4 className="text-warning">Are you sure you want to approved this leave? </h4>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-around">
                    <Button variant="danger" onClick={() => setRightModalExample(false)}> No </Button>
                    <Button variant="success" onClick={ApprovedLeave}>Yes</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={declineModal} onHide={() => setDeclineModal(false)}>
                <Modal.Body>
                    <h4 className="text-warning">Are you sure you want to declined this leave? </h4>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-around">
                    <Button variant="danger" onClick={() => setDeclineModal(false)}> No </Button>
                    <Button variant="success" onClick={DeclinedLeave}>Yes</Button>
                </Modal.Footer>
            </Modal>

        </Card>
    )
}

export default PendingTable