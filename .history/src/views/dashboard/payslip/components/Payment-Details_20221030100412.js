/* eslint-disable prettier/prettier */
import React from 'react'
import { Row, Col, Button } from 'react-bootstrap';

function PaymentDetails({ details }) {

    const urlUser = "https://payroll.up.railway.app/img/users/"
    const urlReceipt = "https://payroll.up.railway.app/img/recept/"

    console.log(" Result : ", details);

    return (
        <div>
            <div className="mx-2">
                <Row>
                    <Col md={6}>
                        <h5 className="my-5"> <b>  Proof of payment  </b>   </h5>
                        <div className="card hover-img-scale-up w-50 mb-4">
                            <img src={`${urlReceipt}${details[0]?.paymentRecept}`} alt="user" className=" sh-25 scale cursor-pointer" />
                        </div>
                    </Col>
                    <Col md={6}>
                        <h5 className="my-5"> <b> Payment Details </b> </h5>
                        <p> <b> Salary Amount : </b>  {details[0]?.salaryAmount} </p>
                        <p> <b> Overtime hours worked : </b>  {details[0]?.hoursWork} </p>
                        <p> <b> Overtime Salary Amount : </b>  {details[0]?.overTimeAmount} </p>
                        <p> <b> Payment date : </b>  {details[0]?.paymentDate} </p>
                        <p> <b> Status : </b>  {details[0]?.status} </p>
                    </Col>
                </Row>
                <Row>
                    <Col md={5}>
                        <h5 className="my-5"> <b> Employee Profile image </b>  </h5>
                        <div className="sh-10 me-1 mb-1 d-inline-block card hover-img-scale-up">
                            <img src={`${urlUser}${details[0]?.user?.photo}`} alt="user" className="img-fluid-height rounded-md scale cursor-pointer" />
                        </div>
                    </Col>

                    <Col md={7}>
                        <Row>
                            <Col md={6}>
                                <h5 className="my-5"> <b> Employee Details </b> </h5>
                                <p> ID Number :  {details[0]?.user?.IdNumber} </p>
                                <p> Acc. Name :  {details[0]?.user?.accountName} </p>
                                <p> Acc. Number :  {details[0]?.user?.accountNumber} </p>
                                <p> Acc. type :  {details[0]?.user?.accountType} </p>
                            </Col>
                            <Col md={6} className="mt-5 pt-3">
                                <h5 className="my-5"> <b>  </b> </h5>
                                <h5 className="my-5"> <b>  </b> </h5>
                                <p> Branch Name :  {details[0]?.user?.branchName} </p>
                                <p> Email :  {details[0]?.user?.email} </p>
                                <p> Full Name :  {details[0]?.user?.firstName}  {details[0]?.lastName}</p>
                                <p> Phone Number :  {details[0]?.user?.phoneNumber} </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Button> Download </Button>

            </div>

        </div>
    )
}

export default PaymentDetails