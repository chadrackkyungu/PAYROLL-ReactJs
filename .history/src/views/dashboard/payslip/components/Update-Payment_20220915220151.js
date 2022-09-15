/* eslint-disable no-underscore-dangle */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Form, Row, Card, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { warningMessage, successMessage } from "../../../../components/Notifications/Notifications";

function UpdatePaymentForm({ details }) {
    const history = useHistory()
    const urlReceipt = "https://polar-basin-47052.herokuapp.com/img/recept/";

    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;
    const [btnLoad, setBtnLoad] = useState(false)

    const validationSchema = Yup.object().shape({
        overTimeAmount: Yup.number(),
        hoursWork: Yup.number(),
        salaryAmount: Yup.number().nullable().required('Salary Amount is required'),
        paymentDate: Yup.date().nullable().required('Payment Date is required'),
        paymentRecept: Yup.mixed().required('Receipt image is required'),
    });

    const initialValues = {
        salaryAmount: details[0].salaryAmount,
        overTimeAmount: details[0].overTimeAmount,
        paymentDate: new Date(details[0].paymentDate),
        hoursWork: details[0].hoursWork,
        paymentRecept: details[0].paymentRecept
    };

    const onSubmit = async (values) => {

        setBtnLoad(true);

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

        fetch(`https://polar-basin-47052.herokuapp.com/api/v1/payments/${details[0]?._id}`, requestOptions)
            .then(response => response.json())
            .then(res => {
                if (res.status === 'success') {
                    setBtnLoad(false);
                    successMessage(`Successful Update Payments `)
                    window.location.reload();
                }
                if (res.status === 'fail') {
                    setBtnLoad(false);
                    warningMessage(`Fail to payment payment tickets`)
                }
            })
            .catch(err => {
                setBtnLoad(false);
                warningMessage(` 🤒 ${err.response.data.message}`)
            })
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
                    <h5 className='mb-5'> <b> Update The Payment Details</b>  </h5>
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

                                <div className="mb-3 filled">
                                    <CsLineIcons icon="calendar" />
                                    <DatePicker className="form-control" name="paymentDate" selected={values.paymentDate} onChange={endDateOnChange} placeholderText="Payment Date" />
                                    {errors.paymentDate && touched.paymentDate && <div className="error">{errors.paymentDate}</div>}
                                </div>

                                <div className="mb-3 filled">
                                    <img src={receipt === undefined ? `${urlReceipt}${details[0].paymentRecept}` : receipt} className="rounded mb-1 float-start sw-18 mx-1" alt="docs image" />
                                </div>

                                <div className="mb-3 filled">
                                    <Form.Control className="form-control" name="paymentRecept" type="file" onChange={paymentReceptFunc} accept="image/*" />
                                    {errors.paymentRecept && touched.paymentRecept && <div className="error">{errors.paymentRecept}</div>}
                                </div>

                            </Row>

                            <div className='d-flex flex-end'>
                                <Button type="submit" variant="primary">
                                    <span className="me-2">Update</span>
                                    {
                                        !btnLoad ? <CsLineIcons icon="arrow-right" /> : <Spinner as="span" animation="border" size="sm" />
                                    }

                                </Button>
                            </div>

                        </Form>

                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UpdatePaymentForm