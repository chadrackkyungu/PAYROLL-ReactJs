/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { Wizard, Steps, Step, WithWizard } from 'react-albus';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Card, Button, Form, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker'; // Date picker
import 'react-datepicker/dist/react-datepicker.css'; // Date Style
import Select from 'react-select';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { validationSchema, initialValueEmpty } from '../../Profile/components/Validation';
import { warningMessage, successMessage } from "../../../../components/Notifications/Notifications";

const WizardBasic = () => {

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




    const dispatch = useDispatch();
    const history = useHistory()
    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;
    const [thumb, setThumb] = useState('/img/profile/profile-1.webp');
    const [image, setImage] = useState()
    // const initialstate = currentUser?.data?.user;


    const initialstate = {
        IdNumber: '',
        gender: '',
        dateOfBirth: null,
        language: '',
        phoneNumber: '',
        materialStatus: '',
        streetAddress: '',
        city: '',
        country: '',
        houseNumber: '',
        zipCode: '',
        stateProvince: '',
        accountName: '',
        accountType: '',
        branchName: '',
        accountNumber: '',
    };


    const onSubmit = async (values) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        const userProfile = JSON.stringify({
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
            "photo": image.type,
        });

        const requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: userProfile,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/v1/users/updateMe", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    successMessage(`Successfully updated the account`)
                    window.setTimeout(() => {
                        history.push('/login');
                    }, 3000);
                }
            })
            .catch(err => warningMessage(` 🤒 ${err.response.data.message}`));
    };

    const formik = useFormik({ initialstate, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors, setFieldValue } = formik;

    //* Photo profile
    const refFileUpload = useRef(null);

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
        { value: "", label: "" },
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
        { value: "", label: "" },
        { value: 'married', label: 'married' },
        { value: 'un married', label: 'un married' },
    ];
    const [materialStatusValue, setMaterialStatusValue] = useState(materialOptions[0]);
    const selectMaterialStatusOnChange = (selectedOption) => {
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
        setFieldValue('language', selectedOption.value);
        setLanguageValue(selectedOption);
    }; // End
    //* Selection


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

                            <div className="m-3 mx-auto position-relative" id="imageUpload">
                                <img src={thumb} alt="user" className="rounded-xl border border-separator-light border-4 sw-11 sh-11" id="contactThumbModal" />
                                <Button size="sm" variant="separator-light" className="btn-icon btn-icon-only position-absolute rounded-xl s-0 b-0"
                                    onClick={onThumbChangeClick}
                                >
                                    <CsLineIcons icon="upload" className="text-alternate" />
                                </Button>
                                <Form.Control type="file" ref={refFileUpload} className="file-upload d-none" accept="image/*" onChange={changeThumb} />
                            </div>


                            <h5 className="mb-2 mt-2 text-primary py-5"> Personal details </h5>
                            <div className="sh-30">
                                <Row>
                                    <Col md={6}>
                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="user" />
                                            <Form.Control type="text" placeholder="ID Number" name="IdNumber" onChange={handleChange} />
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
                                            <DatePicker className="form-control" name="dateOfBirth" onChange={birthDateOnChange} placeholderText="Date of birth" />
                                            {errors.dateOfBirth && touched.dateOfBirth && <div className="error">{errors.dateOfBirth}</div>}
                                        </div>

                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="web" />
                                            <Select classNamePrefix="react-select" options={languageOptions} onChange={selectLanguageOnChange} name="language" />
                                            {errors.language && touched.language && <div className="error">{errors.language}</div>}
                                        </div>

                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="phone" />
                                            <Form.Control type="text" placeholder="Phone Number" name="phoneNumber" onChange={handleChange} />
                                            {errors.phoneNumber && touched.IdNumber && <div className="error">{errors.phoneNumber}</div>}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Step>


                        <Step id="step2" name="Second" desc="Second description">
                            <h5 className="mb-2 mt-2 text-primary py-5"> Address details </h5>
                            <div className="sh-30">
                                <Row>
                                    <Col md={6}>
                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="pin" />
                                            <Form.Control type="text" placeholder="21 Doris Street" name="streetAddress" onChange={handleChange} />
                                            {errors.streetAddress && touched.streetAddress && <div className="error">{errors.streetAddress}</div>}
                                        </div>

                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="pin" />
                                            <Form.Control type="text" placeholder="Johannesburg" name="city" onChange={handleChange} />
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
                                            <Form.Control type="number" value={values.zipCode} placeholder="2001" name="zipCode" onChange={handleChange} />
                                            {errors.zipCode && touched.zipCode && <div className="error">{errors.zipCode}</div>}
                                        </div>

                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="web" />
                                            <Form.Control type="text" value={values.stateProvince} placeholder="Gauteng" name="stateProvince" onChange={handleChange} />
                                            {errors.stateProvince && touched.stateProvince && <div className="error">{errors.stateProvince}</div>}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Step>


                        <Step id="step3" hideTopNav>
                            <h5 className="mb-2 mt-2 text-primary py-5"> Account details </h5>
                            <div className="sh-30">

                                <Row>
                                    <Col md={6}>
                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="credit-card" />
                                            <Form.Control type="text" placeholder="Account Name" name="accountName" onChange={handleChange} />
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
                                            <Form.Control type="text" placeholder="Branch Name" name="branchName" onChange={handleChange} />
                                            {errors.branchName && touched.branchName && <div className="error">{errors.branchName}</div>}
                                        </div>

                                        <div className="mb-3 filled">
                                            <CsLineIcons icon="money" />
                                            <Form.Control type="number" placeholder="89234643452345" name="accountNumber" onChange={handleChange} />
                                            {errors.accountNumber && touched.accountNumber && <div className="error">{errors.accountNumber}</div>}
                                        </div>
                                    </Col>
                                </Row>

                                <Button type="submit" variant="primary" className="btn-icon btn-icon-end">
                                    <span>Submit</span> <CsLineIcons icon="arrow-right" />
                                </Button>

                            </div>
                        </Step>

                    </Steps>

                </Form>


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
