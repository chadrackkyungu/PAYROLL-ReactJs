/* eslint-disable prefer-template */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Badge, Card } from 'react-bootstrap';

function PendingTable(props) {
    const { currentUser } = useSelector((state) => state.auth);
    const [rightModalExample, setRightModalExample] = useState(false);
    const [leaveId, setLeaveId] = useState();
    const [myLeaves, setMyLeave] = useState()

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
                        </tr>
                    </thead>
                    <tbody>
                        {props.data?.map((leave, key) => (
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
                                    > {leave.status === "pending" ? "Edit" : "no action"} </Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <section className="scroll-section" id="rightModal">
                <Modal className="modal-right" show={rightModalExample} onHide={() => setRightModalExample(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Leave</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <UpdateLeave leaves={myLeaves} id={leaveId} />
                    </Modal.Body>
                </Modal>
            </section>


        </Card>
    )
}

export default PendingTable