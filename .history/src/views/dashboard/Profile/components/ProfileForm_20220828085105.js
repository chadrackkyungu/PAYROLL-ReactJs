/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { Col, Card, Button, Form, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker'; // Date picker
import 'react-datepicker/dist/react-datepicker.css'; // Date Style
import Select from 'react-select';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const AccountSettings = () => {

    const validationSchema = Yup.object().shape({
        IdNumber: Yup.number().nullable().required('ID Number is required'),
        phoneNumber: Yup.number().nullable().required('Phone Number is required'),
        gender: Yup.string().nullable().required('Gender is required'),
        language: Yup.string().nullable().required('Language is required'),
        materialStatus: Yup.string().nullable().required('Material Status is required'),
        streetAddress: Yup.string().nullable().required('Street Address is required'),
        houseNumber: Yup.number().nullable().required('House number is required'),
        country: Yup.string().nullable().required('country is required'),
        stateProvince: Yup.string().nullable().required('State or province is required'),
        city: Yup.string().nullable().required('City is required'),
        zipCode: Yup.number().nullable().required('Zip Code is required'),
        accountName: Yup.string().nullable().required('Account Name is required'),
        branchName: Yup.string().nullable().required('Branch Name is required'),
        accountNumber: Yup.number().nullable().required('Account Number is required'),
        accountType: Yup.string().nullable().required('Account Type is required'),
        dateOfBirth: Yup.date().nullable().required('Date of birth is required'),
    });

    const initialValues = {
        IdNumber: '65656565',
        phoneNumber: '4565656',
        gender: 'male',
        language: 'english',
        materialStatus: 'maried',
        streetAddress: '21 doris street ',
        country: 'South Africa',
        stateProvince: 'Gauteng',
        city: 'Johannesburg',
        zipCode: '2198',
        accountName: 'Lwazi',
        branchName: 'Braamfontein',
        accountNumber: '898989898',
        accountType: 'Saving',
        dateOfBirth: "26-09-1997",
    };

    const onSubmit = (values) => console.log('submit form', values);

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors, setFieldValue } = formik;

    //* Photo profile
    const refFileUpload = useRef(null);
    const [thumb, setThumb] = useState('/img/profile/profile-1.webp');

    const onThumbChangeClick = () => {
        if (refFileUpload) {
            refFileUpload.current.dispatchEvent(new MouseEvent('click'));
        }
    };
    const changeThumb = (event) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                setThumb(loadEvent.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    //* End


    //* Date 
    const birthDateOnChange = (date) => {
        setFieldValue('dateOfBirth', new Date(date));
    }; //* End


    //* Selection
    // Gender
    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' },
    ];

    const [genderValue, setGenderValue] = useState(genderOptions[0]);
    const selectGenderOnChange = (selectedOption) => {
        setFieldValue('gender', selectedOption.value);
        setGenderValue(selectedOption);
    }; // End


    // Material Status
    const materialOptions = [
        { value: 'married', label: 'married' },
        { value: 'un married', label: 'un married' },
    ];
    const [materialStatusValue, setMaterialStatusValue] = useState(materialOptions[1]);
    const selectMaterialStatusOnChange = (selectedOption) => {
        setFieldValue('materialStatus', selectedOption.value);
        setMaterialStatusValue(selectedOption);
    }; // End


    // Account type
    const typeOptions = [
        { value: 'Savings', label: 'Savings' },
        { value: 'Other', label: 'Other' },
    ];
    const [typeValue, setTypeValue] = useState(typeOptions[1]);
    const selectTypeOnChange = (selectedOption) => {
        setFieldValue('accountType', selectedOption.value);
        setTypeValue(selectedOption);
    }; // End


    // Language
    const languageOptions = [
        { value: 'English', label: 'English' },
        { value: 'Français', label: 'Français' },
    ];
    const [languageValue, setLanguageValue] = useState(languageOptions[1]);
    const selectLanguageOnChange = (selectedOption) => {
        setFieldValue('language', selectedOption.value);
        setLanguageValue(selectedOption);
    }; // End
    //* Selection



    return (
        <>
            <Col>
                <Form onSubmit={handleSubmit} className="d-flex flex-column">
                    <div className="m-3 mx-auto position-relative" id="imageUpload">
                        <img src={thumb} alt="user" className="rounded-xl border border-separator-light border-4 sw-11 sh-11" id="contactThumbModal" />
                        <Button size="sm" variant="separator-light" className="btn-icon btn-icon-only position-absolute rounded-xl s-0 b-0"
                            onClick={onThumbChangeClick}
                        >
                            <CsLineIcons icon="upload" className="text-alternate" />
                        </Button>
                        <Form.Control type="file" ref={refFileUpload} className="file-upload d-none" accept="image/*" onChange={changeThumb} />
                    </div>

                    <h5 className="mb-2 mt-2 text-primary"> Personal details </h5>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <label htmlFor="">ID Number</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="user" />
                                        <Form.Control type="text" placeholder="ID Number" defaultValue="Blanch" name="IdNumber" value={values.IdNumber} onChange={handleChange} />
                                        {errors.IdNumber && touched.IdNumber && <div className="error">{errors.IdNumber}</div>}
                                    </div>

                                    <label htmlFor="">Gender</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="gender" />
                                        <Select classNamePrefix="react-select" options={genderOptions} value={genderValue} onChange={selectGenderOnChange} placeholder="Select" />
                                        {errors.IdNumber && touched.IdNumber && <div className="error">{errors.IdNumber}</div>}
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <label htmlFor="">Date of birth</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="calendar" />
                                        <DatePicker className="form-control" name="dateOfBirth" selected={values.dateOfBirth} onChange={birthDateOnChange} placeholderText="Date of birth" />
                                        {errors.dateOfBirth && touched.dateOfBirth && <div className="error">{errors.dateOfBirth}</div>}
                                    </div>

                                    <label htmlFor="">Language</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="web" />
                                        <Select classNamePrefix="react-select" options={languageOptions} value={languageValue} onChange={selectLanguageOnChange} name="language" />
                                        {errors.language && touched.language && <div className="error">{errors.language}</div>}
                                    </div>
                                </Col>

                                <label htmlFor="">Material Status</label>
                                <div className="mb-3 filled">
                                    <CsLineIcons icon="user" />
                                    <Select classNamePrefix="react-select" options={materialOptions} value={materialStatusValue} onChange={selectMaterialStatusOnChange} placeholder="Select" name="materialStatus" />
                                    {errors.materialStatus && touched.materialStatus && <div className="error">{errors.materialStatus}</div>}
                                </div>
                            </Row>
                        </Card.Body>
                    </Card>

                    <h5 className="mb-2 mt-2 text-primary"> Address details </h5>

                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <label htmlFor="">streetAddress</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="pin" />
                                        <Form.Control type="text" placeholder="21 Doris Street" defaultValue="21 Doris Street" name="streetAddress" value={values.streetAddress} onChange={handleChange} />
                                        {errors.streetAddress && touched.streetAddress && <div className="error">{errors.streetAddress}</div>}
                                    </div>

                                    <label htmlFor="">City</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="pin" />
                                        <Form.Control type="text" placeholder="Johannesburg" defaultValue="Johannesburg" name="city" value={values.city} onChange={handleChange} />
                                        {errors.city && touched.city && <div className="error">{errors.city}</div>}
                                    </div>

                                    <label htmlFor="">Country</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="web" />
                                        <Form.Control type="text" placeholder="South Africa" defaultValue="South Africa" name="country" value={values.country} onChange={handleChange} />
                                        {errors.country && touched.country && <div className="error">{errors.country}</div>}
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <label htmlFor="">House Number</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="home-garage" />
                                        <Form.Control type="number" placeholder="14" defaultValue="14" name="houseNumber" value={values.houseNumber} onChange={handleChange} />
                                        {errors.houseNumber && touched.houseNumber && <div className="error">{errors.houseNumber}</div>}
                                    </div>

                                    <label htmlFor="">ZipCode</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="web" />
                                        <Form.Control type="number" placeholder="2001" defaultValue="2001" name="zipCode" value={values.zipCode} onChange={handleChange} />
                                        {errors.zipCode && touched.zipCode && <div className="error">{errors.zipCode}</div>}
                                    </div>

                                    <label htmlFor="">State / Province</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="web" />
                                        <Form.Control type="text" placeholder="Gauteng" defaultValue="Gauteng" name="stateProvince" value={values.stateProvince} onChange={handleChange} />
                                        {errors.stateProvince && touched.stateProvince && <div className="error">{errors.stateProvince}</div>}
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <h5 className="mb-2 mt-2 text-primary"> Account details </h5>

                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <label htmlFor="">Account Name</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="credit-card" />
                                        <Form.Control type="text" placeholder="Account Name" defaultValue="Blanch" name="accountName" value={values.accountName} onChange={handleChange} />
                                        {errors.accountName && touched.accountName && <div className="error">{errors.accountName}</div>}
                                    </div>

                                    <label htmlFor="">Account Type</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="credit-card" />
                                        <Select classNamePrefix="react-select" options={typeOptions} value={typeValue} onChange={selectTypeOnChange} placeholder="Select" name="type" />
                                        {errors.accountType && touched.accountType && <div className="error">{errors.accountType}</div>}
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <label htmlFor="">Branch Name</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="credit-card" />
                                        <Form.Control type="text" placeholder="Branch Name" defaultValue="Lwazi" name="branchName" value={values.branchName} onChange={handleChange} />
                                        {errors.branchName && touched.branchName && <div className="error">{errors.branchName}</div>}
                                    </div>

                                    <label htmlFor="">Account Number</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="money" />
                                        <Form.Control type="number" placeholder="89234643452345" defaultValue="89234643452345" name="accountNumber" value={values.accountNumber} onChange={handleChange} />
                                        {errors.accountNumber && touched.accountNumber && <div className="error">{errors.accountNumber}</div>}
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <Button type="submit" variant="primary mt-4">Update</Button>
                </Form>

            </Col>
        </>
    );
};

export default AccountSettings;
