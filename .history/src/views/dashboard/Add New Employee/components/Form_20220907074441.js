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
import { validationSchema } from '../../Profile/components/Validation';
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
    const initialstate = currentUser?.data?.user;

    const initialValues = {
        IdNumber: initialstate?.IdNumber,
        gender: initialstate?.gender,
        dateOfBirth: initialstate?.dateOfBirth,
        language: initialstate?.language,
        phoneNumber: initialstate?.phoneNumber,
        materialStatus: initialstate?.materialStatus,
        streetAddress: initialstate?.streetAddress,
        city: initialstate?.city,
        country: initialstate?.country,
        houseNumber: initialstate?.houseNumber,
        zipCode: initialstate?.zipCode,
        stateProvince: initialstate?.stateProvince,
        accountName: initialstate?.accountName,
        accountType: initialstate?.accountType,
        branchName: initialstate?.branchName,
        accountNumber: initialstate?.accountNumber,
        photo: image === undefined ? image : thumb,
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

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
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
        { value: initialstate?.gender, label: initialstate?.gender },
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
        { value: initialstate?.materialStatus, label: initialstate?.materialStatus },
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
        { value: initialstate?.accountType, label: initialstate?.accountType },
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
        { value: initialstate?.language, label: initialstate?.language },
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
                            <div className="sh-30">
                                <Form>
                                    <h5 className="card-title">First Title</h5>
                                    <p className="card-text text-alternate mb-4">Cake bonbon sugar plum pudding biscuit muffin icing dessert bear claw. </p>
                                    <div className="mb-3 top-label">
                                        <Form.Control type="text" />
                                        <Form.Label>FIRST NAME</Form.Label>
                                    </div>
                                    <div className="mb-3 top-label">
                                        <Form.Control type="text" />
                                        <Form.Label>LAST NAME</Form.Label>
                                    </div>
                                </Form>
                            </div>
                        </Step>


                        <Step id="step2" name="Second" desc="Second description">
                            <div className="sh-30">
                                <Form>
                                    <h5 className="card-title">Second Title</h5>
                                    <p className="card-text text-alternate mb-4">Pastry wafer icing icing marshmallow dessert jelly-o apple pie lollipop.</p>
                                    <div className="mb-3 top-label">
                                        <Form.Control type="email" />
                                        <Form.Label>EMAIL</Form.Label>
                                    </div>
                                    <div className="mb-3 top-label">
                                        <Form.Control type="password" />
                                        <Form.Label>PASSWORD</Form.Label>
                                    </div>
                                </Form>
                            </div>
                        </Step>


                        <Step id="step3" hideTopNav>
                            <div className="sh-30 d-flex flex-column justify-content-center align-items-center">
                                <h3 className="mb-2">Thank You!</h3>
                                <p>Your registration completed successfully!</p>
                                <Button variant="primary" className="btn-icon btn-icon-end">
                                    <span>Login</span> <CsLineIcons icon="arrow-circle" />
                                </Button>
                            </div>
                            <Button type="submit" variant="primary mt-4 w-25">Submit</Button>
                        </Step>

                    </Steps>

                </Form>


                <WithWizard
                    render={({ next, previous, step, steps }) => (
                        <div className="wizard-buttons d-flex justify-content-center">
                            <Button
                                variant="outline-primary"
                                className={`btn-icon btn-icon-start me-1 ${steps.indexOf(step) <= 0 ? 'disabled' : ''}`}
                                onClick={() => {
                                    onClickPrev(previous, steps, step);
                                }}
                            >
                                <CsLineIcons icon="chevron-left" /> <span>Back</span>
                            </Button>
                            <Button
                                variant="outline-primary"
                                className={`btn-icon btn-icon-end ${steps.indexOf(step) >= steps.length - 1 ? 'disabled' : ''}`}
                                onClick={() => {
                                    onClickNext(next, steps, step);
                                }}
                            >
                                <span>Next</span> <CsLineIcons icon="chevron-right" />
                            </Button>
                        </div>
                    )}
                />

            </Wizard>

        </div>
    );
};

export default WizardBasic;
