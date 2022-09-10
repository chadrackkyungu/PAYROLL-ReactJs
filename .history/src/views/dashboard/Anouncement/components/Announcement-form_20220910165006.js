/* eslint-disable no-underscore-dangle */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Col, Row, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { warningMessage, successMessage } from "../../../../components/Notifications/Notifications";

function UpdatePaymentForm() {

    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;

    const validationSchema = Yup.object().shape({
        overTimeAmount: Yup.number(),
        hoursWork: Yup.number(),
        salaryAmount: Yup.number().nullable().required('Salary Amount is required'),
        paymentDate: Yup.date().nullable().required('Payment Date is required'),
        paymentRecept: Yup.mixed().required('Receipt image is required'),
    });

    const initialValues = {
        salaryAmount: '',
        overTimeAmount: "",
        paymentDate: '',
        hoursWork: '',
        paymentRecept: ''
    };

    const onSubmit = async (values) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const formdata = new FormData();
        formdata.append("salaryAmount", values.salaryAmount);
        formdata.append("overTimeAmount", values.overTimeAmount);
        formdata.append("hoursWork", values.hoursWork);
        formdata.append("paymentDate", values.paymentDate);
        formdata.append("paymentRecept", values.paymentRecept);

        const requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`http://localhost:5000/api/v1/payments/`, requestOptions)
            .then(response => response.json())
            .then(res => {
                if (res.status === 'success') {
                    successMessage(`Successful Update Payments `)
                }
                if (res.status === 'fail') {
                    warningMessage(`Fail to payment payment tickets`)
                }
            })
            .catch(err => warningMessage(` 🤒 ${err.response.data.message}`))
    }

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors, setFieldValue } = formik;


    return (
        <div>
            <Card className="mt-4">
                <Card.Body>
                    <h5 className='mb-5'> <b> Create new announcement</b>  </h5>
                    <Row>

                        <Form onSubmit={handleSubmit} className="tooltip-end-top">

                            <Row>
                                <div className="mb-3 filled">
                                    <CsLineIcons icon="dollar" />
                                    <Form.Control name="salaryAmount" value={values.salaryAmount} onChange={handleChange} placeholder="Salary Amount" />
                                    {errors.salaryAmount && touched.salaryAmount && <div className="error">{errors.salaryAmount}</div>}
                                </div>

                                <div className="mb-3 filled">
                                    <CsLineIcons icon="dollar" />
                                    <Form.Control name="overTimeAmount" value={values.overTimeAmount} onChange={handleChange} placeholder="Salary Overtime Amount" />
                                    {errors.overTimeAmount && touched.overTimeAmount && <div className="error">{errors.overTimeAmount}</div>}
                                </div>

                                <div className="mb-3 filled">
                                    <CsLineIcons icon="clock" />
                                    <Form.Control className="form-control" name="hoursWork" value={values.hoursWork} onChange={handleChange} placeholder="Hours Worked" />
                                    {errors.hoursWork && touched.hoursWork && <div className="error">{errors.hoursWork}</div>}
                                </div>

                            </Row>

                            <div className='d-flex flex-end'>
                                <Button type="submit" variant="primary"> Send </Button>
                            </div>

                        </Form>

                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UpdatePaymentForm