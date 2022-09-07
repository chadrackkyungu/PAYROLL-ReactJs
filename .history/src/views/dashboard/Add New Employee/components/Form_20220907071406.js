/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { createRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Wizard, Steps, Step, WithWizard } from 'react-albus';
import {
    Button, Form, Spinner,
    row, Card, Col
} from 'react-bootstrap';
import { Formik, Field } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import DatePicker from 'react-datepicker'; // Date picker
import 'react-datepicker/dist/react-datepicker.css'; // Date Style
import Select from 'react-select';

const validateFirstName = (value) => {
    let error;
    if (!value) {
        error = 'Please enter your first name';
    } else if (value.length < 2) {
        error = 'Value must be longer than 2 characters';
    }
    return error;
};

const validateLastName = (value) => {
    let error;
    if (!value) {
        error = 'Please enter your last name';
    } else if (value.length < 2) {
        error = 'Value must be longer than 2 characters';
    }
    return error;
};

const validatePassword = (value) => {
    let error;
    if (!value) {
        error = 'Please enter your password';
    } else if (value.length < 6) {
        error = 'Password must be longer than 6 characters';
    }
    return error;
};

const validateEmail = (value) => {
    let error;
    if (!value) {
        error = 'Please enter your email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
    }
    return error;
};




const WizardValidation = () => {


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

                    window.setTimeout(() => {
                        dispatch(Logout({
                            thumb: '/img/profile/profile-9.webp',
                            role: 'admin',
                        }))
                    }, 3000);

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



    const forms = [createRef(null), createRef(null)];
    const [bottomNavHidden, setBottomNavHidden] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fields, setFields] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const onClickNext = (goToNext, steps, step) => {
        if (steps.length - 1 <= steps.indexOf(step)) {
            return;
        }
        const formIndex = steps.indexOf(step);
        const form = forms[formIndex].current;

        form.submitForm().then(() => {
            if (!form.isDirty && form.isValid) {
                const newFields = { ...fields, ...form.values };
                setFields(newFields);

                if (steps.length - 2 <= steps.indexOf(step)) {
                    // done
                    setBottomNavHidden(true);
                    setLoading(true);
                    console.log(newFields);
                    setTimeout(() => {
                        setLoading(false);
                    }, 3000);
                }
                goToNext();
                step.isDone = true;
            }
        });
    };

    const onClickPrev = (goToPrev, steps, step) => {
        if (steps.indexOf(step) <= 0) {
            return;
        }
        goToPrev();
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
                                            <Button variant="link" className="nav-link pe-none">
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





                <Steps>

                    <Step id="step1" name="First" desc="First description">
                        <div className="sh-30">
                            <Formik innerRef={forms[0]} initialValues={{ firstName: fields.firstName, lastName: fields.lastName, }} validateOnMount onSubmit={() => { }}>
                                {({ errors, touched }) => (
                                    <Form>
                                        <h5 className="card-title"> First Title </h5>
                                        <p className="card-text text-alternate mb-4">Cake bonbon sugar plum pudding biscuit muffin icing dessert bear claw. </p>
                                        <div className="mb-3 top-label tooltip-end-top">
                                            <Form.Label>FIRST NAME</Form.Label>

                                            <Row>
                                                <Col md={6}>
                                                    <label htmlFor="">ID Number</label>
                                                    <div className="mb-3 filled">
                                                        <CsLineIcons icon="user" />
                                                        <Form.Control type="text" placeholder="ID Number" name="IdNumber" value={values.IdNumber} onChange={handleChange} />
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
                                                        <DatePicker className="form-control" name="dateOfBirth" selected={new Date(values.dateOfBirth)} onChange={birthDateOnChange} placeholderText="Date of birth" />
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
                                                        <Form.Control type="text" placeholder="Phone Number" defaultValue="Blanch" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} />
                                                        {errors.phoneNumber && touched.IdNumber && <div className="error">{errors.phoneNumber}</div>}
                                                    </div>
                                                </Col>


                                            </Row>

                                        </div>
                                        <div className="mb-3 top-label tooltip-end-top">
                                            <Form.Label>LAST NAME</Form.Label>

                                            <Field className="form-control" name="lastName" validate={validateLastName} />
                                            {errors.lastName && touched.lastName ? (
                                                <Form.Control.Feedback type="invalid" tooltip className="d-block">
                                                    {errors.lastName}
                                                </Form.Control.Feedback>
                                            ) : null}

                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </Step>


                    <Step id="step2" name="Second" desc="Second description">
                        <div className="sh-30">
                            <Formik
                                innerRef={forms[1]}
                                initialValues={{
                                    email: fields.email,
                                    password: fields.password,
                                }}
                                validateOnMount
                                onSubmit={() => { }}
                            >
                                {({ errors, touched }) => (
                                    <Form>
                                        <h5 className="card-title">Second Title</h5>
                                        <p className="card-text text-alternate mb-4">Pastry wafer icing icing marshmallow dessert jelly-o apple pie lollipop.</p>
                                        <div className="mb-3 top-label tooltip-end-top">
                                            <Form.Label>EMAIL</Form.Label>
                                            <Field className="form-control" name="email" validate={validateEmail} />
                                            {errors.email && touched.email ? (
                                                <Form.Control.Feedback type="invalid" tooltip className="d-block">
                                                    {errors.email}
                                                </Form.Control.Feedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3 top-label tooltip-end-top">
                                            <Form.Label>PASSWORD</Form.Label>
                                            <Field className="form-control" type="password" name="password" validate={validatePassword} />
                                            {errors.password && touched.password ? (
                                                <Form.Control.Feedback type="invalid" tooltip className="d-block">
                                                    {errors.password}
                                                </Form.Control.Feedback>
                                            ) : null}
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </Step>


                    <Step id="step3" hideTopNav>
                        <div className="sh-30 d-flex flex-column justify-content-center align-items-center">
                            {loading ? (
                                <div className="text-center">
                                    <Spinner animation="border" variant="primary" />
                                    <p>Creating account...</p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <h3 className="mb-2">Thank You!</h3>
                                    <p>Your registration completed successfully!</p>
                                    <Button variant="primary" className="btn-icon btn-icon-end">
                                        <span>Login</span> <CsLineIcons icon="user" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Step>

                </Steps>





                <WithWizard
                    render={({ next, previous, step, steps }) => (
                        <div className={`wizard-buttons d-flex justify-content-center ${bottomNavHidden && 'invisible'}`}>
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

export default WizardValidation;
