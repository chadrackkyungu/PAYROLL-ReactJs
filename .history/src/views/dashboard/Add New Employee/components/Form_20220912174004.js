/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Button, Form, Row } from 'react-bootstrap';
import { Wizard, Steps, Step, WithWizard } from 'react-albus';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker'; // Date picker
import 'react-datepicker/dist/react-datepicker.css'; // Date Style
import Select from 'react-select';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { validationSchema2, initialValueEmpty } from '../../Profile/components/Validation';
import { warningMessage, successSubmitLeave } from "../../../../components/Notifications/Notifications";

const WizardBasic = () => {

    const urlUser = "http://localhost:5000/img/users/"
    const urlDoc = "http://localhost:5000/img/docs/"

    const dispatch = useDispatch();
    const history = useHistory()
    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;
    const [thumb, setThumb] = useState('/img/profile/profile-1.webp');
    const [image, setImage] = useState()
    const initialValues = initialValueEmpty
    const validationSchema = validationSchema2

    const [profile, setProfile] = useState(); // Photo user profile
    const [doc1, setDoc1] = useState(); // Photo document 1
    const [doc2, setDoc2] = useState(); // Photo document 2
    const [doc3, setDoc3] = useState(); // Photo document 3


    const onClickNext = (goToNext, steps, step) => {
        step.isDone = true;
        if (steps.length - 1 <= steps.indexOf(step)) {
            return;
        }
        goToNext();
    };

    const onClickPrev = (goToPrev, steps, step) => {
        if (steps.indexOf(step) <= 0) {
            return;
        }
        goToPrev();
    };


    const topNavClick = (stepItem, push) => {
        push(stepItem.id);
    };

    const getClassName = (steps, step, index, stepItem) => {
        if (steps.indexOf(step) === index) {
            return 'step-doing';
        }
        if (steps.indexOf(step) > index || stepItem.isDone) {
            stepItem.isDone = true;
            return 'step-done';
        }
        return 'step';
    };


    // *==================================
    // FORM
    // *==================================


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
            "password": values.password,
            "passwordConfirm": values.passwordConfirm,
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

    //* Photo profile
    // const refFileUpload = useRef(null);

    // const onThumbChangeClick = () => {
    //     if (refFileUpload) {
    //         refFileUpload.current.dispatchEvent(new MouseEvent('click'));
    //     }
    // };

    // const changeThumb = (event) => {
    //     if (event.target.files && event.target.files[0]) {
    //         console.log(event.target.files[0])
    //         setImage(event.target.files[0])
    //         const reader = new FileReader();
    //         reader.onload = (loadEvent) => {
    //             setThumb(loadEvent.target.result);
    //         };
    //         reader.readAsDataURL(event.target.files[0]);
    //     }
    // };
    // End


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




    //* upload documents image 
    const refFileUpload = useRef(null);

    const onThumbChangeClick = () => {
        if (refFileUpload) {
            refFileUpload.current.dispatchEvent(new MouseEvent('click'));
        }
    };

    const changeThumb = (event) => {
        if (event.target.files && event.target.files[0]) {
            setFieldValue("photo", event.target.files[0])
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                setProfile(loadEvent.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const uploadDocuments = (event) => {
        if (event.target.files && event.target.files[0]) {
            setFieldValue("uploadDocPic", event.target.files[0])
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                setDoc1(loadEvent.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const uploadDocuments2 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setFieldValue("uploadDocPic2", event.currentTarget.files[0]);
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                setDoc2(loadEvent.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const uploadDocuments3 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setFieldValue("uploadDocPic3", event.currentTarget.files[0]);
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                setDoc3(loadEvent.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    //* End

    return (
        <div className="wizard wizard-default">
            <Wizard>

                <WithWizard
                    render={({ next, previous, step, steps, go, push }) => (
                        <ul className="nav nav-tabs justify-content-center">
                            {steps.map((stepItem, index) => {
                                if (!stepItem.hideTopNav) {
                                    return (
                                        <li key={`topNavStep_${index}`} className={`nav-item ${getClassName(steps, step, index, stepItem)}`}>
                                            <Button variant="link" className="nav-link" onClick={() => topNavClick(stepItem, push)}>
                                                <span>{stepItem.name}</span>
                                                <small>{stepItem.desc}</small>
                                            </Button>
                                        </li>
                                    );
                                }
                                return <span key={`topNavStep_${index}`} />;
                            })}
                        </ul>
                    )}
                />


                <Form onSubmit={handleSubmit} className="d-flex flex-column tooltip-end-top">

                    <Steps>

                        <Step id="step1" name="First" desc="First description">

                            {/* <div className="m-3 mx-auto position-relative" id="imageUpload">
                                <img src={thumb} alt="user" className="rounded-xl border border-separator-light border-4 sw-11 sh-11" id="contactThumbModal" />
                                <Button size="sm" variant="separator-light" className="btn-icon btn-icon-only position-absolute rounded-xl s-0 b-0"
                                    onClick={onThumbChangeClick}
                                >
                                    <CsLineIcons icon="upload" className="text-alternate" />
                                </Button>
                                <Form.Control type="file" ref={refFileUpload} className="file-upload d-none" accept="image/*" onChange={changeThumb} />
                            </div> */}


                            <div className="m-3 mx-auto position-relative mt-5" id="imageUpload">
                                <img src={profile} alt="user" className="rounded-xl border border-separator-light border-4 sw-11 sh-11" id="contactThumbModal" />
                                <Button size="sm" variant="separator-light" className="btn-icon btn-icon-only position-absolute rounded-xl s-0 b-0"
                                    onClick={onThumbChangeClick}
                                >
                                    <CsLineIcons icon="upload" className="text-alternate" />
                                </Button>
                                <Form.Control type="file" ref={refFileUpload} className="file-upload d-none" accept="image/*" onChange={changeThumb} />
                            </div>


                            <h5 className="mb-2 text-primary py-5"> Personal details </h5>
                            <div className="sh-30">
                                <Row>
                                    <Col md={6}>
                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="user" />
                                            <Form.Control type="text" placeholder="first name" name="firstName" value={values.firstName} onChange={handleChange} />
                                            {errors.firstName && touched.firstName && <div className="error">{errors.firstName}</div>}
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="user" />
                                            <Form.Control type="text" placeholder="last name" name="lastName" value={values.lastName} onChange={handleChange} />
                                            {errors.lastName && touched.lastName && <div className="error">{errors.lastName}</div>}
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="pen" />
                                            <Form.Control type="text" placeholder="ID number" name="IdNumber" value={values.IdNumber} onChange={handleChange} />
                                            {errors.IdNumber && touched.IdNumber && <div className="error">{errors.IdNumber}</div>}
                                        </div>

                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="gender" />
                                            <Select classNamePrefix="react-select" options={genderOptions} onChange={selectGenderOnChange} placeholder="Select" />
                                            {errors.IdNumber && touched.IdNumber && <div className="error">{errors.IdNumber}</div>}
                                        </div>

                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="user" />
                                            <Select classNamePrefix="react-select" options={materialOptions} onChange={selectMaterialStatusOnChange} placeholder="Select" name="materialStatus" />
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
                                            <Form.Control type="text" placeholder="Phone Number" value={values.phoneNumber} name="phoneNumber" onChange={handleChange} />
                                            {errors.phoneNumber && touched.IdNumber && <div className="error">{errors.phoneNumber}</div>}
                                        </div>

                                    </Col>

                                </Row>
                            </div>

                            <h5 className="text-primary py-5"> Upload Your Image Documents </h5>

                            <div className="my-5 d-flex justify-content-center">
                                <img src={doc1} className="rounded mb-1 float-start sw-25 mx-1" alt="docs image" />
                                <img src={doc2} className="rounded mb-1 float-start sw-18 mx-1" alt="docs image" />
                                <img src={doc3} className="rounded mb-1 float-start sw-18 mx-1" alt="docs image" />
                            </div>

                            <div className="d-flex">
                                <Form.Control className="mx-2" name="uploadDocPic" type="file" onChange={uploadDocuments} accept="image/*" />
                                <br />
                                <Form.Control className="mx-2" name="uploadDocPic2" type="file" onChange={uploadDocuments2} accept="image/*" />
                                <br />
                                <Form.Control className="mx-2" name="uploadDocPic3" type="file" onChange={uploadDocuments3} accept="image/*" />
                            </div>


                            <h5 className="text-primary py-5"> Address details </h5>
                            <div className="sh-30">
                                <Row>
                                    <Col md={6}>
                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="pin" />
                                            <Form.Control type="text" placeholder="21 Doris Street" value={values.streetAddress} name="streetAddress" onChange={handleChange} />
                                            {errors.streetAddress && touched.streetAddress && <div className="error">{errors.streetAddress}</div>}
                                        </div>

                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="pin" />
                                            <Form.Control type="text" placeholder="Johannesburg" value={values.city} name="city" onChange={handleChange} />
                                            {errors.city && touched.city && <div className="error">{errors.city}</div>}
                                        </div>

                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="web" />
                                            <Form.Control type="text" placeholder="South Africa" value={values.country} name="country" onChange={handleChange} />
                                            {errors.country && touched.country && <div className="error">{errors.country}</div>}
                                        </div>
                                    </Col>

                                    <Col md={6}>
                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="home-garage" />
                                            <Form.Control type="number" placeholder="14" value={values.houseNumber} name="houseNumber" onChange={handleChange} />
                                            {errors.houseNumber && touched.houseNumber && <div className="error">{errors.houseNumber}</div>}
                                        </div>

                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="web" />
                                            <Form.Control type="number" placeholder="2001" value={values.zipCode} name="zipCode" onChange={handleChange} />
                                            {errors.zipCode && touched.zipCode && <div className="error">{errors.zipCode}</div>}
                                        </div>

                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="web" />
                                            <Form.Control type="text" placeholder="Gauteng" value={values.stateProvince} name="stateProvince" onChange={handleChange} />
                                            {errors.stateProvince && touched.stateProvince && <div className="error">{errors.stateProvince}</div>}
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                        </Step>


                        <Step id="step2" name="Second" desc="Second description">

                            <h5 className="mb-2 text-primary py-5"> Employee details </h5>

                            <Row>
                                <Col md={6}>
                                    <div className="mb-3 filled">
                                        <CsLineIcons icon="email" />
                                        <Form.Control type="email" placeholder="email" name="email" value={values.email} onChange={handleChange} />
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
                                        <Form.Control type="number" placeholder="Employee Number" name="employeeNumber" value={values.employeeNumber} onChange={handleChange} />
                                        {errors.employeeNumber && touched.employeeNumber && <div className="error">{errors.employeeNumber}</div>}
                                    </div>
                                </Col>
                            </Row>
                        </Step>


                        <Step id="step3" hideTopNav>
                            <h5 className="mb-2  text-primary py-5"> Account details </h5>
                            <div className="sh-30">

                                <Row>
                                    <Col md={6}>
                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="credit-card" />
                                            <Form.Control type="text" placeholder="Account Name" value={values.accountName} name="accountName" onChange={handleChange} />
                                            {errors.accountName && touched.accountName && <div className="error">{errors.accountName}</div>}
                                        </div>

                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="credit-card" />
                                            <Select classNamePrefix="react-select" options={typeOptions} onChange={selectTypeOnChange} placeholder="Select" name="type" />
                                            {errors.accountType && touched.accountType && <div className="error">{errors.accountType}</div>}
                                        </div>
                                    </Col>

                                    <Col md={6}>
                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="credit-card" />
                                            <Form.Control type="text" placeholder="Branch Name" value={values.branchName} name="branchName" onChange={handleChange} />
                                            {errors.branchName && touched.branchName && <div className="error">{errors.branchName}</div>}
                                        </div>

                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="money" />
                                            <Form.Control type="number" placeholder="89234643452345" value={values.accountNumber} name="accountNumber" onChange={handleChange} />
                                            {errors.accountNumber && touched.accountNumber && <div className="error">{errors.accountNumber}</div>}
                                        </div>
                                    </Col>

                                    <div className="mb-3 position-relative form-group">
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" name="agreed" onChange={handleChange} value={values.agreed} />
                                            <label className="form-check-label">
                                                I agree with the terms and conditions and privacy policy for this company.
                                            </label>
                                            {errors.agreed && touched.agreed && <div className="d-block invalid-tooltip">{errors.agreed}</div>}
                                        </div>
                                    </div>

                                </Row>

                                <Button type="submit" variant="primary" className="btn-icon btn-icon-end">
                                    <span>Submit</span> <CsLineIcons icon="arrow-right" />
                                </Button>

                            </div>
                        </Step>

                    </Steps>

                </Form>

                <br />

                <WithWizard
                    render={({ next, previous, step, steps }) => (
                        <div className="wizard-buttons d-flex justify-content-center">
                            <Button variant="outline-primary" className={`btn-icon btn-icon-start me-1 ${steps.indexOf(step) <= 0 ? 'disabled' : ''}`}
                                onClick={() => {
                                    onClickPrev(previous, steps, step);
                                }}
                            > <CsLineIcons icon="chevron-left" /> <span>Back</span>
                            </Button>
                            <Button variant="outline-primary" className={`btn-icon btn-icon-end ${steps.indexOf(step) >= steps.length - 1 ? 'disabled' : ''}`}
                                onClick={() => {
                                    onClickNext(next, steps, step);
                                }}
                            > <span>Next</span> <CsLineIcons icon="chevron-right" />
                            </Button>
                        </div>
                    )}
                />

            </Wizard>

        </div>
    );
};

export default WizardBasic;
