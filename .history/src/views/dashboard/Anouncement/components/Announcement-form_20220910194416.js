/* eslint-disable no-underscore-dangle */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Row, Card, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { warningMessage, successMessage } from "../../../../components/Notifications/Notifications";

function UpdatePaymentForm() {

    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;
    const [users, setUsers] = useState()

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch("http://localhost:5000/api/v1/users", requestOptions)
            .then(response => response.json())
            .then(result => setUsers(result.data.data))
            .catch(error => console.log('error', error));
    }, [token]);

    console.log(users);

    const validationSchema = Yup.object().shape({
        category: Yup.string().nullable().required('Category is required'),
        types: Yup.string().nullable().required('Types is required'),
        message: Yup.string().nullable().required('Message is required'),
    });

    const initialValues = {
        category: '',
        types: "",
        message: '',
    };

    const onSubmit = async (values) => {
        console.log(values);

        // fetch(`http://localhost:5000/api/v1/payments/`, requestOptions)
        //     .then(response => response.json())
        //     .then(res => {
        //         if (res.status === 'success') {
        //             successMessage(`Successful Update Payments `)
        //         }
        //         if (res.status === 'fail') {
        //             warningMessage(`Fail to payment payment tickets`)
        //         }
        //     })
        //     .catch(err => warningMessage(` 🤒 ${err.response.data.message}`))
    }

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors, setFieldValue } = formik;

    const category = [
        { value: '', label: '' },
        { value: 'Finance', label: 'Finance' },
        { value: 'Meeting', label: 'Meeting' },
        { value: 'Maintenance', label: 'Maintenance' },
        { value: 'Others', label: 'Others' },
    ];
    const [categoryValue, setCategoryValue] = useState(category[0]);

    const categoryOnChange = (selectedOption) => {
        setFieldValue('category', selectedOption.value);
        setCategoryValue(selectedOption);
    };

    const types = [
        { value: '', label: '' },
        { value: 'Money', label: 'Money' },
        { value: 'Others', label: 'Others' },
    ];
    const [typeValue, setTypeValue] = useState(types[0]);

    const typeOnChange = (selectedOption) => {
        setFieldValue('types', selectedOption.value);
        setTypeValue(selectedOption);
    };

    return (
        <div>
            <Card className="mt-4">
                <Card.Body>
                    <h5 className='mb-5'> <b> Send an announcement</b>  </h5>
                    <Row>

                        <Form onSubmit={handleSubmit} className="tooltip-end-top">
                            <Row>
                                <Col md={4}>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="menu-dropdown" />
                                        <Select classNamePrefix="react-select" options={category} value={categoryValue} onChange={categoryOnChange} />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <label>Select Category</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="menu-dropdown" />
                                        <Select classNamePrefix="react-select" name="category" options={category} value={categoryValue} onChange={categoryOnChange} placeholder="Select category" />
                                        {errors.category && touched.category && <div className="error">{errors.category}</div>}
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <label className="mb-3">Select Type</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="menu-dropdown" />
                                        <Select classNamePrefix="react-select" name="types" options={types} value={typeValue} onChange={typeOnChange} placeholder="Select types" />
                                        {errors.types && touched.types && <div className="error">{errors.types}</div>}
                                    </div>
                                </Col>
                            </Row>



                            <div className="mb-3 filled">
                                <CsLineIcons icon="notebook-1" />
                                <Form.Control name="message" as="textarea" rows={5} value={values.message} onChange={handleChange} placeholder="Message" />
                                {errors.message && touched.message && <div className="error">{errors.message}</div>}
                            </div>

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