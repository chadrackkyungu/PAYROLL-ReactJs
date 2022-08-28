/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';



function LeaveForm() {

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().min(6, 'Must be at least 6 chars!').required('Password is required'),
    });

    const initialValues = { email: '', password: '' };
    const onSubmit = (values) => console.log('submit form', values);

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors } = formik;


    return (
        <div>
            <form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>

                <div className="mb-3 filled form-group tooltip-end-top">
                    <CsLineIcons icon="calendar" />
                    <Form.Control type="date" name="leaveStartDate" value={values.leaveStartDate} onChange={handleChange} />
                    {errors.leaveStartDate && touched.leaveStartDate && <div className="d-block invalid-tooltip">{errors.leaveStartDate}</div>}
                </div>

                <div className="mb-3 filled form-group tooltip-end-top">
                    <CsLineIcons icon="calendar" />
                    <Form.Control type="date" name="leaveEndDate" onChange={handleChange} value={values.leaveEndDate} />
                    {errors.leaveEndDate && touched.leaveEndDate && <div className="d-block invalid-tooltip">{errors.leaveEndDate}</div>}
                </div>

                <div className="mb-3 filled form-group tooltip-end-top">
                    <CsLineIcons icon="chevron-bottom" />
                    <Form.Control type="select" name="leaveType" onChange={handleChange} value={values.leaveType}>
                        {/* <option>Vacation</option>
                        <option>Sick</option>
                        <option>Others</option> */}
                    </Form.Control>
                    {errors.leaveType && touched.leaveType && <div className="d-block invalid-tooltip">{errors.leaveType}</div>}
                </div>

                <div className="mb-3 filled form-group tooltip-end-top">
                    <CsLineIcons icon="calendar" />
                    <Form.Control type="password" name="message" onChange={handleChange} value={values.password} placeholder="Password" />
                    {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
                </div>

                <Button size="lg" type="submit"> Submit </Button>
            </form>
        </div>
    )
}

export default LeaveForm