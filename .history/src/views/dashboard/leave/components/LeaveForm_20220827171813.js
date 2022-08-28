/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactTags from 'react-tag-autocomplete';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

function LeaveForm() {

    const validationSchema = Yup.object().shape({
        date: Yup.date().nullable().required('Date is required'),
        select: Yup.string().required('Select is required'),
        address: Yup.string().required('Address is required'),
    });
    const initialValues = { address: '', select: '', date: null };
    const onSubmit = (values) => console.log('submit form', values);

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors, setFieldValue } = formik;

    const [selectValue, setSelectValue] = useState();
    const options = [
        { value: 'Breadstick', label: 'Breadstick' },
        { value: 'Biscotti', label: 'Biscotti' },
        { value: 'Fougasse', label: 'Fougasse' },
        { value: 'Lefse', label: 'Lefse' },
    ];
    const selectOnChange = (selectedOption) => {
        setFieldValue('select', selectedOption.value);
        setSelectValue(selectedOption);
    };

    const dateOnChange = (date) => {
        setFieldValue('date', new Date(date));
    };


    return (
        <Form onSubmit={handleSubmit} className="tooltip-end-top">
            <div className="mb-3 filled">
                <CsLineIcons icon="calendar" />
                <DatePicker className="form-control" name="date" selected={values.date} onChange={dateOnChange} placeholderText="Date" />
                {errors.date && touched.date && <div className="error">{errors.date}</div>}
            </div>
            <div className="mb-3 filled">
                <CsLineIcons icon="loaf" />
                <Select classNamePrefix="react-select" name="select" options={options} value={selectValue} onChange={selectOnChange} placeholder="Select" />
                {errors.select && touched.select && <div className="error">{errors.select}</div>}
            </div>
            <div className="mb-3 filled">
                <CsLineIcons icon="notebook-1" />
                <Form.Control name="address" as="textarea" rows={3} value={values.address} onChange={handleChange} placeholder="Address" />
                {errors.address && touched.address && <div className="error">{errors.address}</div>}
            </div>
            <Button type="submit" variant="primary">
                Submit
            </Button>
        </Form>
    )
}

export default LeaveForm