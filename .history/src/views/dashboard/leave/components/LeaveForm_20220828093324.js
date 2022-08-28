/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

function LeaveForm() {

    const validationSchema = Yup.object().shape({
        leaveStartDate: Yup.date().nullable().required('Leave Start Date is required'),
        leaveEndDate: Yup.date().nullable().required('Leave End Date is required'),
        select: Yup.string().required('The type is required'),
        message: Yup.string().max(500).required('Message is required'),
    });
    const initialValues = { message: '', select: '', leaveStartDate: null, leaveEndDate: null };
    const onSubmit = (values) => console.log('submit form', values);

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors, setFieldValue } = formik;

    const [selectValue, setSelectValue] = useState();
    const options = [
        { value: 'Vacation', label: 'Vacation' },
        { value: 'Sick', label: 'Sick' },
        { value: 'Others', label: 'Others' },
    ];

    const selectOnChange = (selectedOption) => {
        setFieldValue('select', selectedOption.value);
        setSelectValue(selectedOption);
    };

    const startDateOnChange = (leaveStartDate) => {
        setFieldValue('leaveStartDate', new Date(leaveStartDate));
    };

    const endDateOnChange = (leaveEndDate) => {
        setFieldValue('leaveEndDate', new Date(leaveEndDate));
    };

    return (
        <Form onSubmit={handleSubmit} className="tooltip-end-top">

            <Row>
                <Col m={6}>
                    <div className="mb-3 filled">
                        <CsLineIcons icon="calendar" />
                        <DatePicker className="form-control" name="leaveStartDate" selected={values.leaveStartDate} onChange={startDateOnChange} placeholderText="Start Date" />
                        {errors.leaveStartDate && touched.leaveStartDate && <div className="error">{errors.leaveStartDate}</div>}
                    </div>
                </Col>
                <Col m={6}>
                    <div className="mb-3 filled">
                        <CsLineIcons icon="calendar" />
                        <DatePicker className="form-control" name="leaveEndDate" selected={values.leaveEndDate} onChange={endDateOnChange} placeholderText="End Date" />
                        {errors.leaveEndDate && touched.leaveEndDate && <div className="error">{errors.leaveEndDate}</div>}
                    </div>
                </Col>
            </Row>


            <div className="mb-3 filled">
                <CsLineIcons icon="loaf" />
                <Select classNamePrefix="react-select" name="select" options={options} value={selectValue} onChange={selectOnChange} placeholder="Select leave type" />
                {errors.select && touched.select && <div className="error">{errors.select}</div>}
            </div>

            <div className="mb-3 filled">
                <CsLineIcons icon="notebook-1" />
                <Form.Control name="message" as="textarea" rows={3} value={values.message} onChange={handleChange} placeholder="Message" />
                {errors.message && touched.message && <div className="error">{errors.message}</div>}
            </div>

            <Button type="submit" variant="primary"> Submit</Button>
        </Form>
    )
}

export default LeaveForm