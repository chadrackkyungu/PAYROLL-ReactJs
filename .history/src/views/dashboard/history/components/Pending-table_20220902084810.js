/* eslint-disable prettier/prettier */
import React from 'react'
import { Row, Col, Badge, Card, Button } from 'react-bootstrap';

function PendingTable(props) {
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
                        {newArray?.map((leave, key) => (
                            <tr key={"_tr_" + key}>
                                <td>
                                    <div className="form-check font-size-16">
                                        <input type="checkbox" className="form-check-input" id={leave.id} />
                                        <label className="form-check-label" htmlFor={leave.id}> &nbsp;</label>
                                    </div>
                                </td>
                                <td> <Link to={leave.id} className="text-body fw-bold">{leave.id}</Link></td>
                                <td>{leave.leaveStartDate}</td>
                                <td>{leave.leaveEndDate}</td>
                                <td>{leave.leaveType}</td>
                                <td><Badge className={"bg-warning font-size-11 badge-soft-" + leave.badgeClass} color={leave.badgeClass} pill>{leave.status}</Badge> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    )
}

export default PendingTable