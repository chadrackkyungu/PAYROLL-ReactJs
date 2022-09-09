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
        leaveStartDate: Yup.date().nullable().required('Leave Start Date is required'),
        leaveEndDate: Yup.date().nullable().required('Leave End Date is required'),
        select: Yup.string().required('The type is required'),
        message: Yup.string().required('Message is required').min(100).max(1000),
    });

    const initialValues = { message: '', select: '', leaveStartDate: null, leaveEndDate: null };

    const onSubmit = async (values) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        const userInputDetails = JSON.stringify({
            "leaveStartDate": values.leaveStartDate,
            "leaveEndDate": values.leaveEndDate,
            "leaveType": values.select,
            "message": values.message
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: userInputDetails,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/v1/leaves", requestOptions)
            .then(response => response.json())
            .then(res => {
                if (res.status === 'success') {
                    successSubmitLeave(` Successfully submit a leave 🍺👏`)
                }
            })
            .catch(err => warningMessage(` 🤒 ${err.response.data.message}`))
    }

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors, setFieldValue } = formik;


    const endDateOnChange = (leaveEndDate) => {
        setFieldValue('leaveEndDate', new Date(leaveEndDate));
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
                                        <CsLineIcons icon="calendar" />
                                        <DatePicker className="form-control" name="leaveEndDate" selected={values.leaveEndDate} onChange={endDateOnChange} placeholderText="End Date" />
                                        {errors.leaveEndDate && touched.leaveEndDate && <div className="error">{errors.leaveEndDate}</div>}
                                    </div>
                                </Col>

                                <Col md={6}>

                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="dollar" />
                                        <Form.Control name="salaryAmount" value={values.salaryAmount} onChange={handleChange} placeholder="Salary Amount" />
                                        {errors.salaryAmount && touched.salaryAmount && <div className="error">{errors.salaryAmount}</div>}
                                    </div>
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