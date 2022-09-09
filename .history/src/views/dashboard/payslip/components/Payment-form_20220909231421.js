/* eslint-disable no-underscore-dangle */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Col, Row, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css'; // Date Style
import DatePicker from 'react-datepicker';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useHistory } from 'react-router-dom';
import { warningMessage, successMessage } from "../../../../components/Notifications/Notifications";

function PaymentForm({ employeeDetails }) {

    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;
    const history = useHistory()

    const validationSchema = Yup.object().shape({
        overTimeAmount: Yup.number(),
        hoursWork: Yup.number(),
        salaryAmount: Yup.number().nullable().required('Salary Amount is required'),
        paymentDate: Yup.date().nullable().required('Payment Date is required'),
        paymentRecept: Yup.mixed().required('Receipt image is required'),
    });

    const initialValues = { salaryAmount: '', overTimeAmount: '', paymentDate: null, hoursWork: '', paymentRecept: '' };

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
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`http://localhost:5000/api/v1/payments/${employeeDetails[0]?._id}`, requestOptions)
            .then(response => response.json())
            .then(res => {
                if (res.status === 'success') {
                    successMessage(`Successfully Payment`)

                    window.setTimeout(() => {
                        history.push('/Admin/successful')
                    }, 3000);
                }
                if (res.status === 'fail') {
                    warningMessage(`Payment Was not completed successfully`)
                }
            })
            .catch(err => warningMessage(` 🤒 ${err.response.data.message}`))
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
                                        <Form.Control name="overTimeAmount" value={values.overTimeAmount} onChange={handleChange} placeholder="Salary Overtime Amount" />
                                        {errors.overTimeAmount && touched.overTimeAmount && <div className="error">{errors.overTimeAmount}</div>}
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
                                    <div className="mb-3 filled">
                                        <Form.Control className="form-control" name="paymentRecept" type="file" onChange={paymentReceptFunc} accept="image/*" />
                                        {errors.paymentRecept && touched.paymentRecept && <div className="error">{errors.paymentRecept}</div>}
                                    </div>
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