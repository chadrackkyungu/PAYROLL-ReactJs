/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Col, Card, Button, Form, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker'; // Date picker
import 'react-datepicker/dist/react-datepicker.css'; // Date Style
import Select from 'react-select';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { validationSchema, initialValues } from './Validation';

const AccountSettings = () => {

    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;
    const [image, setImage] = useState()
    console.log("User Details : ", currentUser.data.user);
    console.log("Images : ", image);

    const onSubmit = async (values) => {
        console.log(values);
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer Bearer ${token}`);

        const userProfile = JSON.stringify({
            "IdNumber": values,
            "gender": "female",
            "accountName": "lwazi",
            "accountNumber": 123456789987,
            "accountType": "savings",
            "agreed": true,
            "branchName": "braamfontein",
            "city": "Johannesburg",
            "country": "South Africa",
            "dateOfBirth": "2004-05-22T00:00:00.000Z",
            "email": "magloire@gmail.com",
            "employeeNumber": 5,
            "firstName": "MAGLOIRE",
            "houseNumber": 5,
            "language": "20-05-2000",
            "lastName": "NkUMWIMBA UPDATE !!!!",
            "materialStatus": "un maried",
            "phoneNumber": 827000150,
            "photo": image,
            "stateProvince": "Gauteng",
            "streetAddress": "21 Alex",
        });

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            body: userProfile,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/v1/users/updateMe", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    };

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
            console.log(event.target.files[0])
            setImage(event.target.files[0])
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                setThumb(loadEvent.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    //* Date 
    const birthDateOnChange = (date) => {
        setFieldValue('dateOfBirth', new Date(date));
    }; //* End

    //* Selection
    // Gender
    const genderOptions = [
        { value: currentUser.data.user.gender, label: currentUser.data.user.gender },
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
        { value: currentUser.data.user.materialStatus, label: currentUser.data.user.materialStatus },
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
        { value: currentUser.data.user.accountType, label: currentUser.data.user.accountType },
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
        { value: currentUser.data.user.language, label: currentUser.data.user.language },
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
            <Form onSubmit={handleSubmit} className="d-flex flex-column tooltip-end-top">

                <div className="m-3 mx-auto position-relative" id="imageUpload">
                    <img src={currentUser.data.user.photo ? currentUser.data.user.photo : thumb} alt="user" className="rounded-xl border border-separator-light border-4 sw-11 sh-11" id="contactThumbModal" />
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
                                    <Form.Control type="text" placeholder="ID Number" name="IdNumber" value={currentUser.data.user.IdNumber} onChange={handleChange} />
                                    {errors.IdNumber && touched.IdNumber && <div className="error">{errors.IdNumber}</div>}
                                </div>

                                <label htmlFor="">Gender</label>
                                <div className="mb-3 filled">
                                    <CsLineIcons icon="gender" />
                                    <Select classNamePrefix="react-select" options={genderOptions} value={genderValue} onChange={selectGenderOnChange} placeholder="Select" />
                                    {errors.IdNumber && touched.IdNumber && <div className="error">{errors.IdNumber}</div>}
                                </div>

                                <label htmlFor="">Material Status</label>
                                <div className="mb-3 filled">
                                    <CsLineIcons icon="user" />
                                    <Select classNamePrefix="react-select" options={materialOptions} value={materialStatusValue} onChange={selectMaterialStatusOnChange} placeholder="Select" name="materialStatus" />
                                    {errors.materialStatus && touched.materialStatus && <div className="error">{errors.materialStatus}</div>}
                                </div>
                            </Col>
                            <Col md={6}>
                                <label htmlFor="">Date of birth</label>
                                <div className="mb-3 filled">
                                    <CsLineIcons icon="calendar" />
                                    <DatePicker className="form-control" name="dateOfBirth" selected={new Date(currentUser.data.user.dateOfBirth)} onChange={birthDateOnChange} placeholderText="Date of birth" />
                                    {errors.dateOfBirth && touched.dateOfBirth && <div className="error">{errors.dateOfBirth}</div>}
                                </div>

                                <label htmlFor="">Language</label>
                                <div className="mb-3 filled">
                                    <CsLineIcons icon="web" />
                                    <Select classNamePrefix="react-select" options={languageOptions} value={languageValue} onChange={selectLanguageOnChange} name="language" />
                                    {errors.language && touched.language && <div className="error">{errors.language}</div>}
                                </div>

                                <label htmlFor="">Phone Number</label>
                                <div className="mb-3 filled">
                                    <CsLineIcons icon="phone" />
                                    <Form.Control type="text" placeholder="Phone Number" defaultValue="Blanch" name="phoneNumber" value={currentUser.data.user.phoneNumber} onChange={handleChange} />
                                    {errors.phoneNumber && touched.IdNumber && <div className="error">{errors.phoneNumber}</div>}
                                </div>
                            </Col>


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
                                    <Form.Control type="text" placeholder="21 Doris Street" defaultValue="21 Doris Street" name="streetAddress" value={currentUser.data.user.streetAddress} onChange={handleChange} />
                                    {errors.streetAddress && touched.streetAddress && <div className="error">{errors.streetAddress}</div>}
                                </div>

                                <label htmlFor="">City</label>
                                <div className="mb-3 filled">
                                    <CsLineIcons icon="pin" />
                                    <Form.Control type="text" placeholder="Johannesburg" defaultValue="Johannesburg" name="city" value={currentUser.data.user.city} onChange={handleChange} />
                                    {errors.city && touched.city && <div className="error">{errors.city}</div>}
                                </div>

                                <label htmlFor="">Country</label>
                                <div className="mb-3 filled">
                                    <CsLineIcons icon="web" />
                                    <Form.Control type="text" placeholder="South Africa" defaultValue="South Africa" name="country" value={currentUser.data.user.country} onChange={handleChange} />
                                    {errors.country && touched.country && <div className="error">{errors.country}</div>}
                                </div>
                            </Col>

                            <Col md={6}>
                                <label htmlFor="">House Number</label>
                                <div className="mb-3 filled">
                                    <CsLineIcons icon="home-garage" />
                                    <Form.Control type="number" placeholder="14" defaultValue="14" name="houseNumber" value={currentUser.data.user.houseNumber} onChange={handleChange} />
                                    {errors.houseNumber && touched.houseNumber && <div className="error">{errors.houseNumber}</div>}
                                </div>

                                <label htmlFor="">ZipCode</label>
                                <div className="mb-3 filled">
                                    <CsLineIcons icon="web" />
                                    <Form.Control type="number" placeholder="2001" defaultValue="2001" name="zipCode" value={currentUser.data.user.zipCode} onChange={handleChange} />
                                    {errors.zipCode && touched.zipCode && <div className="error">{errors.zipCode}</div>}
                                </div>

                                <label htmlFor="">State / Province</label>
                                <div className="mb-3 filled">
                                    <CsLineIcons icon="web" />
                                    <Form.Control type="text" placeholder="Gauteng" defaultValue="Gauteng" name="stateProvince" value={currentUser.data.user.stateProvince} onChange={handleChange} />
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
                                    <Form.Control type="text" placeholder="Account Name" defaultValue="Blanch" name="accountName" value={currentUser.data.user.accountName} onChange={handleChange} />
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
                                    <Form.Control type="text" placeholder="Branch Name" defaultValue="Lwazi" name="branchName" value={currentUser.data.user.branchName} onChange={handleChange} />
                                    {errors.branchName && touched.branchName && <div className="error">{errors.branchName}</div>}
                                </div>

                                <label htmlFor="">Account Number</label>
                                <div className="mb-3 filled">
                                    <CsLineIcons icon="money" />
                                    <Form.Control type="number" placeholder="89234643452345" defaultValue="89234643452345" name="accountNumber" value={currentUser.data.user.accountNumber} onChange={handleChange} />
                                    {errors.accountNumber && touched.accountNumber && <div className="error">{errors.accountNumber}</div>}
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Button type="submit" variant="primary mt-4 w-25">Update</Button>
            </Form>
        </>
    );
};

export default AccountSettings;
