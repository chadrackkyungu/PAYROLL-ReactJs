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
            .then(result => {
                const userDet = result?.data?.data?.filter(user => {
                    return user?._id !== currentUser?.data?.user?._id
                })
                setUsers(userDet)
            })
            .catch(error => console.log('error', error));
    }, [token, currentUser?.data?.user?._id]);

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

    // *Select employee
    const employee = users?.map(user => ({
        value: user._id,
        label: user.email
    }))

    const [employeeValue, setEmployeeValue] = useState();

    const employeeOnChange = (selectedOption) => {
        setEmployeeValue(selectedOption);
    };
    //* End

    const generalAPI = "http://localhost:5000/api/v1/announcements/";
    const individualAPI = `http://localhost:5000/api/v1/announcements/${employeeValue?.value}`

    const onSubmit = async (values) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "category": values.category,
            "types": values.types,
            "message": values.message
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(employeeValue === undefined ? generalAPI : individualAPI, requestOptions)
            .then(response => response.json())
            .then(res => {
                console.log(res);

                if (res.status === 'success') {
                    successMessage(`You have successful send an announcement`)
                }
                if (res.status === 'error') {
                    warningMessage(`Fail to send the announcement`)
                }
            })
            .catch(err => warningMessage(` 🤒 ${err.response.data.message}`))
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
    const [categoryValue, setCategoryValue] = useState();

    const categoryOnChange = (selectedOption) => {
        setFieldValue('category', selectedOption.value);
        setCategoryValue(selectedOption);
    };

    const types = [
        { value: '', label: '' },
        { value: 'Money', label: 'Money' },
        { value: 'Others', label: 'Others' },
    ];
    const [typeValue, setTypeValue] = useState();

    const typeOnChange = (selectedOption) => {
        setFieldValue('types', selectedOption.value);
        setTypeValue(selectedOption);
    };

    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const onSwitchAction = () => {
        setIsSwitchOn(!isSwitchOn);
    };
    console.log(isSwitchOn);

    return (
        <div>
            <Card className="mt-4">
                <Card.Body>
                    <h5 className='mb-5'> <b> Send an announcement</b>  </h5>
                    <Row>


                        <Form onSubmit={handleSubmit} className="tooltip-end-top">

                            <Form.Check type="switch" className="mb-5" id="customSwitch" label="Check this switch" onChange={onSwitchAction} />

                            {
                                isSwitchOn && (
                                    <Row className="d-flex justify-content-end">
                                        <Col md={4}>
                                            <h3>  </h3>
                                            <label>Select Employee</label>
                                            <div className="mb-3 filled">
                                                <CsLineIcons icon="menu-dropdown" />
                                                <Select classNamePrefix="react-select"
                                                    options={employee}
                                                    value={employeeValue}
                                                    onChange={employeeOnChange} />
                                            </div>
                                        </Col>
                                    </Row>
                                )
                            }


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
                                    <label>Select Type</label>
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