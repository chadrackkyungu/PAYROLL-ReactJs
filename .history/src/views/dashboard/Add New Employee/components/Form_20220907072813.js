/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { createRef, useState } from 'react';
import { Wizard, Steps, Step, WithWizard } from 'react-albus';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';


const WizardValidation = () => {
    const forms = [createRef(null), createRef(null)];
    const [bottomNavHidden, setBottomNavHidden] = useState(false);
    const [loading, setLoading] = useState(false);

    const onClickNext = (goToNext, steps, step) => {
        if (steps.length - 1 <= steps.indexOf(step)) {
            return;
        }
        const formIndex = steps.indexOf(step);
        const form = forms[formIndex].current;

        form.submitForm().then(() => {
            if (!form.isDirty && form.isValid) {

                if (steps.length - 2 <= steps.indexOf(step)) {
                    // done
                    setBottomNavHidden(true);
                    setLoading(true);

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
                            <Formik
                                innerRef={forms[0]}

                                validateOnMount
                                onSubmit={() => { }}
                            >
                                {({ errors, touched }) => (
                                    <Form>
                                        <h5 className="card-title">First Title</h5>
                                        <p className="card-text text-alternate mb-4">Cake bonbon sugar plum pudding biscuit muffin icing dessert bear claw. </p>
                                        <div className="mb-3 top-label tooltip-end-top">
                                            <Form.Label>FIRST NAME</Form.Label>
                                            <Field className="form-control" name="firstName" />

                                        </div>
                                        <div className="mb-3 top-label tooltip-end-top">
                                            <Form.Label>LAST NAME</Form.Label>
                                            <Field className="form-control" name="lastName" required />

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
                                            <Field className="form-control" name="email" />

                                        </div>
                                        <div className="mb-3 top-label tooltip-end-top">
                                            <Form.Label>PASSWORD</Form.Label>
                                            <Field className="form-control" type="password" name="password" />

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
                            > <CsLineIcons icon="chevron-left" /> <span>Back</span> </Button>
                            <Button variant="outline-primary" className={`btn-icon btn-icon-end ${steps.indexOf(step) >= steps.length - 1 ? 'disabled' : ''}`}
                                onClick={() => {
                                    onClickNext(next, steps, step);
                                }}
                            > <span>Next</span> <CsLineIcons icon="chevron-right" /> </Button>
                        </div>
                    )}
                />

            </Wizard>



        </div>
    );
};

export default WizardValidation;
