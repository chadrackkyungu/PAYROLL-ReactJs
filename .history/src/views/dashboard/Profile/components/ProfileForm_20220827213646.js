/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { Col, Card, Button, Form, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
        IdNumber: '',
        phoneNumber: '',
        gender: '',
        language: '',
        materialStatus: '',
        streetAddress: '',
        country: '',
        stateProvince: '',
        city: '',
        zipCode: '',
        accountName: '',
        branchName: '',
        accountNumber: '',
        accountType: '',
        dateOfBirth: null,
    };
    const onSubmit = (values) => console.log('submit form', values);

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors, setFieldValue } = formik;


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

    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' },
    ];
    const [genderValue, setGenderValue] = useState(genderOptions[0]);

    const typeOptions = [
        { value: 'Savings', label: 'Savings' },
        { value: 'Other', label: 'Other' },
    ];

    const [typeValue, setTypeValue] = useState(typeOptions[0]);

    const languageOptions = [
        { value: 'English', label: 'English' },
        { value: 'Français', label: 'Français' },
    ];
    const [languageValue, setLanguageValue] = useState(languageOptions[0]);

    const materialOptions = [
        { value: 'married', label: 'married' },
        { value: 'un married', label: 'un married' },
    ];
    const [materialValue, setMaterialValue] = useState(materialOptions[0]);

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
                                        <Form.Control type="text" placeholder="ID Number" defaultValue="Blanch" name="IdNumber" />
                                    </div>

                                    <label htmlFor="">Gender</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="gender" />
                                        <Select classNamePrefix="react-select" options={genderOptions} value={genderValue} onChange={setGenderValue} placeholder="Select" />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <label htmlFor="">Date of birth</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="calendar" />
                                        <Form.Control type="date" placeholder="date of birth" name="dateOfBirth" />
                                    </div>

                                    <label htmlFor="">Language</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="web" />
                                        <Select classNamePrefix="react-select" options={languageOptions} value={languageValue} onChange={setLanguageValue} />
                                    </div>
                                </Col>

                                <label htmlFor="">Material Status</label>
                                <div className="mb-3 filled">
                                    <CsLineIcons icon="user" />
                                    <Select classNamePrefix="react-select" options={materialOptions} value={materialValue} onChange={setMaterialValue} placeholder="Select" />
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
                                        <Form.Control type="text" placeholder="21 Doris Street" defaultValue="21 Doris Street" name="streetAddress" />
                                    </div>

                                    <label htmlFor="">City</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="pin" />
                                        <Form.Control type="text" placeholder="Johannesburg" defaultValue="Johannesburg" name="city" />
                                    </div>

                                    <label htmlFor="">Country</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="web" />
                                        <Form.Control type="text" placeholder="South Africa" defaultValue="South Africa" name="country" />
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <label htmlFor="">House Number</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="home-garage" />
                                        <Form.Control type="number" placeholder="14" defaultValue="14" name="houseNumber" />
                                    </div>

                                    <label htmlFor="">ZipCode</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="web" />
                                        <Form.Control type="number" placeholder="2001" defaultValue="2001" name="zipCode" />
                                    </div>

                                    <label htmlFor="">State / Province</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="web" />
                                        <Form.Control type="text" placeholder="Gauteng" defaultValue="Gauteng" name="stateProvince" />
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
                                        <Form.Control type="text" placeholder="Account Name" defaultValue="Blanch" name="accountName" />
                                    </div>

                                    <label htmlFor="">Account Type</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="credit-card" />
                                        <Select classNamePrefix="react-select" options={typeOptions} value={typeValue} onChange={setTypeValue} placeholder="Select" />
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <label htmlFor="">Branch Name</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="credit-card" />
                                        <Form.Control type="text" placeholder="Branch Name" defaultValue="Lwazi" name="branchName" />
                                    </div>

                                    <label htmlFor="">Account Number</label>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="money" />
                                        <Form.Control type="number" placeholder="89234643452345" defaultValue="89234643452345" name="accountNumber" />
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                </Form>
                <Button variant="primary mt-4">Update</Button>

            </Col>
        </>
    );
};

export default AccountSettings;
