/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Button, Form, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker'; // Date picker
import 'react-datepicker/dist/react-datepicker.css'; // Date Style
import Select from 'react-select';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { validationSchema2, initialValueEmpty } from '../../Profile/components/Validation';
import { warningMessage, successSubmitLeave } from "../../../../components/Notifications/Notifications";

const UpdateUserDetails = ({ details }) => {
    console.log("Result : ", details);

    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;
    const initialValues = initialValueEmpty
    const validationSchema = validationSchema2

    const onSubmit = async (values) => {
        console.log("Result : ", values)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "IdNumber": values.IdNumber,
            "gender": values.gender,
            "dateOfBirth": values.dateOfBirth,
            "language": values.language,
            "phoneNumber": values.phoneNumber,
            "materialStatus": values.materialStatus,
            "streetAddress": values.streetAddress,
            "city": values.city,
            "country": values.country,
            "houseNumber": values.houseNumber,
            "zipCode": values.zipCode,
            "stateProvince": values.stateProvince,
            "accountName": values.accountName,
            "accountType": values.accountType,
            "branchName": values.branchName,
            "accountNumber": values.accountNumber,
            "photo": values.photo,
            "agreed": values.agreed,
            "email": values.email,
            "employeeNumber": values.employeeNumber,
            "firstName": values.firstName,
            "lastName": values.lastName,
            "role": values.role,
            "startDate": values.startDate
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
        { value: details[0].gender, label: details[0].gender },
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

            <Form onSubmit={handleSubmit} className="d-flex flex-column tooltip-end-top">

                <h5 className="mb-2 text-primary py-5 text-center"> Personal details </h5>
                <div className="sh-30">
                    <Row>
                        <Col md={6}>
                            <div className="mb-3 filled">
                                <CsLineIcons icon="user" />
                                <Form.Control type="text" placeholder="first name" name="firstName" value={details[0].firstName} onChange={handleChange} />
                                {errors.firstName && touched.firstName && <div className="error">{errors.firstName}</div>}
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="mb-3 filled">
                                <CsLineIcons icon="user" />
                                <Form.Control type="text" placeholder="last name" name="lastName" value={details[0].lastName} onChange={handleChange} />
                                {errors.lastName && touched.lastName && <div className="error">{errors.lastName}</div>}
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <div className="mb-3 filled">
                                <CsLineIcons icon="pen" />
                                <Form.Control type="text" placeholder="ID number" name="IdNumber" value={details[0].IdNumber} onChange={handleChange} />
                                {errors.IdNumber && touched.IdNumber && <div className="error">{errors.IdNumber}</div>}
                            </div>

                            <div className="mb-3 filled">
                                <CsLineIcons icon="gender" />
                                <Select classNamePrefix="react-select" value={genderValue} options={genderOptions} onChange={selectGenderOnChange} placeholder="Select" />
                                {errors.IdNumber && touched.IdNumber && <div className="error">{errors.IdNumber}</div>}
                            </div>

                            <div className="mb-3 filled">
                                <CsLineIcons icon="user" />
                                <Select classNamePrefix="react-select" value={materialStatusValue} options={materialOptions} onChange={selectMaterialStatusOnChange} placeholder="Select" name="materialStatus" />
                                {errors.materialStatus && touched.materialStatus && <div className="error">{errors.materialStatus}</div>}
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="mb-3 filled">
                                <CsLineIcons icon="calendar" />
                                <DatePicker className="form-control" name="dateOfBirth" selected={values.dateOfBirth} onChange={birthDateOnChange} placeholderText="Date of birth" />
                                {errors.dateOfBirth && touched.dateOfBirth && <div className="error">{errors.dateOfBirth}</div>}
                            </div>

                            <div className="mb-3 filled">
                                <CsLineIcons icon="web" />
                                <Select classNamePrefix="react-select" options={languageOptions} onChange={selectLanguageOnChange} name="language" />
                                {errors.language && touched.language && <div className="error">{errors.language}</div>}
                            </div>

                            <div className="mb-3 filled">
                                <CsLineIcons icon="phone" />
                                <Form.Control type="text" placeholder="Phone Number" value={details[0].phoneNumber} name="phoneNumber" onChange={handleChange} />
                                {errors.phoneNumber && touched.IdNumber && <div className="error">{errors.phoneNumber}</div>}
                            </div>
                        </Col>
                    </Row>

                </div>


                <h5 className="text-primary text-center"> Address details </h5>
                <div className="sh-30">
                    <Row>
                        <Col md={6}>
                            <div className="mb-3 filled">
                                <CsLineIcons icon="pin" />
                                <Form.Control type="text" placeholder="21 Doris Street" value={details[0].streetAddress} name="streetAddress" onChange={handleChange} />
                                {errors.streetAddress && touched.streetAddress && <div className="error">{errors.streetAddress}</div>}
                            </div>

                            <div className="mb-3 filled">
                                <CsLineIcons icon="pin" />
                                <Form.Control type="text" placeholder="Johannesburg" value={details[0].city} name="city" onChange={handleChange} />
                                {errors.city && touched.city && <div className="error">{errors.city}</div>}
                            </div>

                            <div className="mb-3 filled">
                                <CsLineIcons icon="web" />
                                <Form.Control type="text" placeholder="South Africa" value={details[0].country} name="country" onChange={handleChange} />
                                {errors.country && touched.country && <div className="error">{errors.country}</div>}
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="mb-3 filled">
                                <CsLineIcons icon="home-garage" />
                                <Form.Control type="number" placeholder="14" value={details[0].houseNumber} name="houseNumber" onChange={handleChange} />
                                {errors.houseNumber && touched.houseNumber && <div className="error">{errors.houseNumber}</div>}
                            </div>

                            <div className="mb-3 filled">
                                <CsLineIcons icon="web" />
                                <Form.Control type="number" placeholder="2001" value={details[0].zipCode} name="zipCode" onChange={handleChange} />
                                {errors.zipCode && touched.zipCode && <div className="error">{errors.zipCode}</div>}
                            </div>

                            <div className="mb-3 filled">
                                <CsLineIcons icon="web" />
                                <Form.Control type="text" placeholder="Gauteng" value={details[0].stateProvince} name="stateProvince" onChange={handleChange} />
                                {errors.stateProvince && touched.stateProvince && <div className="error">{errors.stateProvince}</div>}
                            </div>
                        </Col>
                    </Row>
                </div>


                <h5 className="mb-2 text-primary py-4 text-center"> Employee details </h5>

                <Row>
                    <Col md={6}>
                        <div className="mb-3 filled">
                            <CsLineIcons icon="email" />
                            <Form.Control type="email" placeholder="email" name="email" value={details[0].email} onChange={handleChange} />
                            {errors.email && touched.email && <div className="error">{errors.email}</div>}
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3 filled">
                            <CsLineIcons icon="user" />
                            <Select classNamePrefix="react-select" options={roleOptions} onChange={selectRoleOnChange} name="role" />
                            {errors.role && touched.role && <div className="error">{errors.role}</div>}
                        </div>
                    </Col>
                </Row>



                <Row>
                    <Col md={6}>
                        <div className="mb-3 filled">
                            <CsLineIcons icon="calendar" />
                            <DatePicker className="form-control" name="startDate" selected={values.startDate} onChange={startDateOnChange} placeholderText="Start Date" />
                            {errors.startDate && touched.dateOfBirth && <div className="error">{errors.startDate}</div>}
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3 filled">
                            <CsLineIcons icon="pen" />
                            <Form.Control type="number" placeholder="Employee Number" name="employeeNumber" value={details[0].employeeNumber} onChange={handleChange} />
                            {errors.employeeNumber && touched.employeeNumber && <div className="error">{errors.employeeNumber}</div>}
                        </div>
                    </Col>
                </Row>

                <h5 className="mb-2  text-primary py-4 text-center"> Account details </h5>
                <div className="">

                    <Row>
                        <Col md={6}>
                            <div className="mb-3 filled">
                                <CsLineIcons icon="credit-card" />
                                <Form.Control type="text" placeholder="Account Name" value={details[0].accountName} name="accountName" onChange={handleChange} />
                                {errors.accountName && touched.accountName && <div className="error">{errors.accountName}</div>}
                            </div>

                            <div className="mb-3 filled">
                                <CsLineIcons icon="credit-card" />
                                <Select classNamePrefix="react-select" value={typeValue} options={typeOptions} onChange={selectTypeOnChange} placeholder="Select" name="type" />
                                {errors.accountType && touched.accountType && <div className="error">{errors.accountType}</div>}
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="mb-3 filled">
                                <CsLineIcons icon="credit-card" />
                                <Form.Control type="text" placeholder="Branch Name" value={details[0].branchName} name="branchName" onChange={handleChange} />
                                {errors.branchName && touched.branchName && <div className="error">{errors.branchName}</div>}
                            </div>

                            <div className="mb-3 filled">
                                <CsLineIcons icon="money" />
                                <Form.Control type="number" placeholder="89234643452345" value={details[0].accountNumber} name="accountNumber" onChange={handleChange} />
                                {errors.accountNumber && touched.accountNumber && <div className="error">{errors.accountNumber}</div>}
                            </div>
                        </Col>

                    </Row>

                </div>
                <Button type="submit" variant="primary" className="btn-icon btn-icon-end mt-4">
                    <span>Update user info</span>
                </Button>
            </Form>

        </div>
    );
};

export default UpdateUserDetails;
