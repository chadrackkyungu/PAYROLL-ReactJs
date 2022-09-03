/* eslint-disable prefer-object-spread */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { warningMessage, successUpdate } from "../../../../components/Notifications/Notifications";

function UpdateLeave(props) {

    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;

    const { leaves, id } = props;
    const leave = leaves.filter(lv => { return lv.id === id })
    const leaveObj = Object.assign(...leave);

    const validationSchema = Yup.object().shape({
        leaveStartDate: Yup.date().nullable().required('Leave Start Date is required'),
        leaveEndDate: Yup.date().nullable().required('Leave End Date is required'),
        select: Yup.string().required('The type is required'),
        message: Yup.string().required('Message is required'),
    });

    const initialValues = { message: leaveObj.message, select: leaveObj.leaveType, leaveStartDate: new Date(leaveObj.leaveStartDate), leaveEndDate: new Date(leaveObj.leaveEndDate) };

    const onSubmit = async (values) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        const data = JSON.stringify({
            "leaveStartDate": values.leaveStartDate,
            "leaveEndDate": values.leaveEndDate,
            "leaveType": values.select,
            "message": values.message
        });

        const requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        fetch(`http://localhost:5000/api/v1/leaves/${id}`, requestOptions)
            .then(response => response.json())
            .then(res => {
                if (res.status === 'success') {
                    successUpdate(` Successfully updated 🍺👏`)
                }
            })
            .catch(err => warningMessage(` 🤒 ${err.response.data.message}`))
    }
    useEffect(() => {
        onSubmit()
    }, []);

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors, setFieldValue } = formik;

    const options = [
        { value: leaveObj.leaveType, label: leaveObj.leaveType },
        { value: 'Vacation', label: 'Vacation' },
        { value: 'Sick', label: 'Sick' },
        { value: 'Others', label: 'Others' },
    ];

    const [selectValue, setSelectValue] = useState(options[0]);

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
            <div className="mb-3 filled">
                <CsLineIcons icon="calendar" />
                <DatePicker className="form-control" name="leaveStartDate" selected={values.leaveStartDate} onChange={startDateOnChange} placeholderText="Start Date" />
                {errors.leaveStartDate && touched.leaveStartDate && <div className="error">{errors.leaveStartDate}</div>}
            </div>

            <div className="mb-3 filled">
                <CsLineIcons icon="calendar" />
                <DatePicker className="form-control" name="leaveEndDate" selected={values.leaveEndDate} onChange={endDateOnChange} placeholderText="End Date" />
                {errors.leaveEndDate && touched.leaveEndDate && <div className="error">{errors.leaveEndDate}</div>}
            </div>

            <div className="mb-3 filled">
                <CsLineIcons icon="loaf" />
                <Select classNamePrefix="react-select" name="select" options={options} value={selectValue} onChange={selectOnChange} placeholder="Select leave type" />
                {errors.select && touched.select && <div className="error">{errors.select}</div>}
            </div>

            <div className="mb-3 filled">
                <CsLineIcons icon="notebook-1" />
                <Form.Control name="message" as="textarea" rows={10} value={values.message} onChange={handleChange} placeholder="Message" />
                {errors.message && touched.message && <div className="error">{errors.message}</div>}
            </div>

            <Button type="submit" variant="primary" className='text-center'> Update </Button>
        </Form>
    )
}

export default UpdateLeave