/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Col, Row, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { warningMessage, successSubmitLeave } from "../../../../components/Notifications/Notifications";

function PaymentForm({ employeeDetails }) {

    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;

    const validationSchema = Yup.object().shape({
        salaryAmount: Yup.number().nullable().required('Salary Amount is required'),
        overTimeAmount: Yup.number().nullable(),
        paymentDate: Yup.date().nullable().required('Payment Date is required'),
        hoursWork: Yup.number().nullable(),
        paymentRecept: Yup.mixed().required('Receipt is required'),
    });

    const initialValues = { message: '', select: '', leaveStartDate: null, leaveEndDate: null };

    const onSubmit = async (values) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        // const userInputDetails = JSON.stringify({
        //     "leaveStartDate": values.leaveStartDate,
        //     "leaveEndDate": values.leaveEndDate,
        //     "leaveType": values.select,
        //     "message": values.message
        // });

        // const requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: userInputDetails,
        //     redirect: 'follow'
        // };

        // fetch("http://localhost:5000/api/v1/leaves", requestOptions)
        //     .then(response => response.json())
        //     .then(res => {
        //         if (res.status === 'success') {
        //             successSubmitLeave(` Successfully submit a leave 🍺👏`)
        //         }
        //     })
        //     .catch(err => warningMessage(` 🤒 ${err.response.data.message}`))
    }

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors, setFieldValue } = formik;


    const endDateOnChange = (paymentDate) => {
        setFieldValue('paymentDate', new Date(paymentDate));
    };

    const [receipt, setReceipt] = useState()

    const paymentReceptFunc = (event) => {
        if (event.target.files && event.target.files[0]) {
            setFieldValue("paymentRecept", event.currentTarget.files[0]);
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                setReceipt(loadEvent.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    return (
        <div>
            <Card className="mt-4">
                <Card.Body>
                    <h5 className='mb-5'> <b> Pay me now</b>  </h5>
                    <Row>

                        <Form onSubmit={handleSubmit} className="tooltip-end-top">
                            <Row>
                                <Col md={6}>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="dollar" />
                                        <Form.Control name="salaryAmount" value={values.salaryAmount} onChange={handleChange} placeholder="Salary Amount" />
                                        {errors.salaryAmount && touched.salaryAmount && <div className="error">{errors.salaryAmount}</div>}
                                    </div>
                                </Col>



                                <Col md={6}>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="dollar" />
                                        <Form.Control name="salaryAmount" value={values.salaryAmount} onChange={handleChange} placeholder="Salary Overtime Amount" />
                                        {errors.salaryAmount && touched.salaryAmount && <div className="error">{errors.salaryAmount}</div>}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="clock" />
                                        <Form.Control className="form-control" name="hoursWork" selected={values.hoursWork} onChange={handleChange} placeholder="Hours Worked" />
                                        {errors.hoursWork && touched.hoursWork && <div className="error">{errors.hoursWork}</div>}
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="calendar" />
                                        <DatePicker className="form-control" name="paymentDate" selected={values.paymentDate} onChange={endDateOnChange} placeholderText="Payment Date" />
                                        {errors.paymentDate && touched.paymentDate && <div className="error">{errors.paymentDate}</div>}
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Control className="form-control" name="paymentRecept" type="file" onChange={paymentReceptFunc} accept="image/*" required />
                                    {errors.paymentRecept && touched.paymentRecept && <div className="error">{errors.paymentRecept}</div>}
                                </Col>
                                <Col md={6}>
                                    <img src={!receipt ? "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" : receipt} className="rounded mb-1 float-start sw-18 mx-1" alt="docs image" />
                                </Col>
                            </Row>

                            <Button type="submit" variant="primary"> Submit</Button>
                        </Form>

                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default PaymentForm