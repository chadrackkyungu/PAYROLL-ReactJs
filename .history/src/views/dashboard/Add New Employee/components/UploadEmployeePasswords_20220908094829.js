/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Button, Form, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker'; // Date picker
import 'react-datepicker/dist/react-datepicker.css'; // Date Style
import Select from 'react-select';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { validationSchema2, initialValueEmpty } from '../../Profile/components/Validation';
import { warningMessage, successSubmitLeave } from "../../../../components/Notifications/Notifications";

const UpdateUserPassword = () => {

    const dispatch = useDispatch();
    const history = useHistory()
    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;
    const initialValues = initialValueEmpty
    const validationSchema = validationSchema2


    // *==================================
    // FORM
    // *==================================


    const onSubmit = async (values) => {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "password": values.password,
            "passwordConfirm": values.passwordConfirm,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/v1/users/signup", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    successSubmitLeave(`Successfully Added the employee!!`)
                }
                if (result.status === "error") {
                    warningMessage(`This employee exist already in the system!!. try to add another employee`)
                }
            })
            .catch(err => warningMessage(` 🤒 ${err.response.data.message}`));
    };

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors, setFieldValue } = formik;

    //* Date 
    const birthDateOnChange = (date) => {
        setFieldValue('dateOfBirth', new Date(date));
    }; //* End

    //* Start Date 
    const startDateOnChange = (date) => {
        setFieldValue('startDate', new Date(date));
    }; //* End


    //* Selection
    // Gender
    const genderOptions = [
        { value: "", label: "" },
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' },
    ];

    const [genderValue, setGenderValue] = useState(genderOptions[0]);
    const selectGenderOnChange = (selectedOption) => {
        setFieldValue('gender', "");
        setFieldValue('gender', selectedOption.value);
        setGenderValue(selectedOption);
    }; // End


    // Material Status
    const materialOptions = [
        { value: "", label: "" },
        { value: 'married', label: 'married' },
        { value: 'un married', label: 'un married' },
    ];
    const [materialStatusValue, setMaterialStatusValue] = useState(materialOptions[0]);
    const selectMaterialStatusOnChange = (selectedOption) => {
        setFieldValue('materialStatus', "");
        setFieldValue('materialStatus', selectedOption.value);
        setMaterialStatusValue(selectedOption);
    }; // End


    // Account type
    const typeOptions = [
        { value: "", label: "" },
        { value: 'Savings', label: 'Savings' },
        { value: 'Other', label: 'Other' },
    ];
    const [typeValue, setTypeValue] = useState(typeOptions[0]);
    const selectTypeOnChange = (selectedOption) => {
        setFieldValue('accountType', "");
        setFieldValue('accountType', selectedOption.value);
        setTypeValue(selectedOption);
    }; // End


    // Language
    const languageOptions = [
        { value: "", label: "" },
        { value: 'English', label: 'English' },
        { value: 'Français', label: 'Français' },
    ];
    const [languageValue, setLanguageValue] = useState(languageOptions[0]);
    const selectLanguageOnChange = (selectedOption) => {
        setFieldValue('language', "");
        setFieldValue('language', selectedOption.value);
        setLanguageValue(selectedOption);
    }; // End
    //* Selection

    // Language
    const roleOptions = [
        { value: "", label: "" },
        { value: 'admin', label: 'admin' },
        { value: 'user', label: 'user' },
    ];
    const [roleValue, setRoleValue] = useState(roleOptions[0]);
    const selectRoleOnChange = (selectedOption) => {
        setFieldValue('role', "");
        setFieldValue('role', selectedOption.value);
        setRoleValue(selectedOption);
    }; // End
    //* Selection

    return (
        <div className="wizard wizard-default">
            <h5 className="mb-2  text-primary py-4 text-center mt-5"> <b> Update Password Only  </b> </h5>
            <Form onSubmit={handleSubmit} className="d-flex flex-column tooltip-end-top">
                <Row>
                    <Col md={6}>
                        <div className="mb-3 filled">
                            <CsLineIcons icon="eye" />
                            <Form.Control type="password" placeholder="Enter your password" name="password" value={values.password} onChange={handleChange} />
                            {errors.password && touched.password && <div className="error">{errors.password}</div>}
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3 filled">
                            <CsLineIcons icon="eye" />
                            <Form.Control type="password" placeholder="Confirm password" name="passwordConfirm" value={values.passwordConfirm} onChange={handleChange} />
                            {errors.passwordConfirm && touched.passwordConfirm && <div className="error">{errors.passwordConfirm}</div>}
                        </div>
                    </Col>
                </Row>

                <Button type="submit" variant="primary" className="btn-icon btn-icon-end mt-2">
                    <span> Update User Password </span>
                </Button>
            </Form>

        </div>
    );
};

export default UpdateUserPassword;
