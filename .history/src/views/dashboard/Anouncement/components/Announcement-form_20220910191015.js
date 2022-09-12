/* eslint-disable no-underscore-dangle */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Row, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
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

    const options = [
        { value: 'Vacation', label: 'Vacation' },
        { value: 'Holiday', label: 'Holiday' },
        { value: 'Sick', label: 'Sick' },
        { value: 'Others', label: 'Others' },
    ];
    const [selectValue, setSelectValue] = useState(options[0]);

    const selectOnChange = (selectedOption) => {
        setFieldValue('select', selectedOption.value);
        setSelectValue(selectedOption);
    };

    return (
        <div>
            <Card className="mt-4">
                <Card.Body>
                    <h5 className='mb-5'> <b> Send an announcement</b>  </h5>
                    <Row>

                        <Form onSubmit={handleSubmit} className="tooltip-end-top">

                            <Row>


                                <div className="mb-3 filled">
                                    <CsLineIcons icon="loaf" />
                                    <Select classNamePrefix="react-select" name="select" options={options} value={selectValue} onChange={selectOnChange} placeholder="Select leave type" />
                                    {errors.select && touched.select && <div className="error">{errors.select}</div>}
                                </div>

                                <div className="mb-3 filled">
                                    <CsLineIcons icon="loaf" />
                                    <Select classNamePrefix="react-select" name="select" options={options} value={selectValue} onChange={selectOnChange} placeholder="Select leave type" />
                                    {errors.select && touched.select && <div className="error">{errors.select}</div>}
                                </div>

                                <div className="mb-3 filled">
                                    <CsLineIcons icon="notebook-1" />
                                    <Form.Control name="message" as="textarea" rows={5} value={values.message} onChange={handleChange} placeholder="Message" />
                                    {errors.message && touched.message && <div className="error">{errors.message}</div>}
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